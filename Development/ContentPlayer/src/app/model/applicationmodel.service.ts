import {CommonloaderService} from './commonloader.service';
import {Content} from './content';
import {ContentCollection} from './contentcollection';
import {DataloaderService} from './dataloader.service';
import {ExternalcommunicationService} from './externalcommunication.service';
import {HttphandlerService} from './httphandler.service';
import {InitializationAPI, Helper, Info} from './initializationapi';
import {DataHandler} from './interfaces/dataHandler';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Subject, Observable} from 'rxjs';

@Injectable()
export class ApplicationmodelService {
  private externalCommunication: ExternalcommunicationService;
  private dataLoader: DataloaderService;
  private dataHandler: DataHandler;
  private httpHandler: HttphandlerService;
  private initValues: InitializationAPI;
  private currentActive: number; // nugget
  private commonLoader: CommonloaderService;
  private contentCollection: ContentCollection;
  private router: Router;
  private subject: Subject<string>;
  public notification: Observable<string>;
  private config: any;
  private currentSection: number; // question

  constructor(router: Router, httpHandler: HttphandlerService, commonLoader: CommonloaderService,
    dataLoader: DataloaderService, externalCommunication: ExternalcommunicationService) {
    this.httpHandler = httpHandler;
    this.commonLoader = commonLoader;
    this.router = router;
    this.config = [
      ['/player/video', '/player/videoext', 0]
    ];
    this.externalCommunication = externalCommunication;
    this.dataLoader = dataLoader;
    this.subject = new Subject<string>();
    this.notification = this.subject.asObservable();
    this.init();
  }

  private init(): void {
    console.log('ApplicationmodelService: init');

    // load startup config
    this.httpHandler.get('./assets/config/init.json', this.initLoaded.bind(this), this.initFailed.bind(this));
  }

  get content(): Content {
    return this.contentCollection.collection[this.currentSection];
  }

  set event(value: any) {
    console.log('ApplicationmodelService: event - value=', value);
    const data = {
      'sessionId': this.initValues.sessionId,
      'segmentId': this.initValues.files[this.currentSection].segmentId,
      'event': value
    };
    this.dataHandler.sendData('eventFromPlayer', data);
  }

  private initLoaded(data): void {
    console.log('ApplicationmodelService: initLoaded - data = ', data);


    if (
      data == null
      || data.environment == null
      || data.environment.lms == null
      || data.environment.standalone == null
    ) {
      throw new Error('ApplicationmodelService: initLoaded - Incorrect startup config: init.json');
    }


    if (data.environment.lms.enabled) {
      console.log('ApplicationmodelService: initLoaded - environment.lms.enabled = true');
      this.dataHandler = this.externalCommunication;
      this.dataHandler.loadData(data.environment.lms, this.listener.bind(this), this.baseLoaded.bind(this), this.baseFailed.bind(this));
    } else if (data.environment.standalone.enabled) {
      console.log('ApplicationmodelService: initLoaded - environment.standalone.enabled = true');
      this.dataHandler = this.dataLoader;
      this.dataHandler.loadData(data.environment.standalone,
        this.listener.bind(this), this.baseLoaded.bind(this), this.baseFailed.bind(this));
    } else {
      throw new Error('ApplicationmodelService: initLoaded - Incorrect startup config: init.json');
    }
  }


  private baseLoaded(data): void {
    console.log('ApplicationmodelService: baseLoaded - data = ', data);
    this.initValues = data;
    this.currentActive = 0;
    this.load(this.initValues.files[this.currentActive]);
  }

  private baseFailed(error): void {

  }

  private listener(data: Info) {
    console.log('ApplicationmodelService: listener - data = ', data);
    this.subject.next(data.id);
  }

  private initFailed(error): void {
    console.log('ApplicationmodelService: initFailed - error = ', error);
  }

  private load(value: Helper): void {
    console.log('ApplicationmodelService: load - value = ', value);
    this.commonLoader.createContent(value, this.loadCompleted.bind(this), this.loadFailed.bind(this));

  }

  private loadCompleted(c: ContentCollection): void {
    console.log('ApplicationmodelService: loadCompleted - c = ', c);
    this.contentCollection = c;
    this.currentSection = 0;
    this.runContent();
  }

  public previousSection(): void {
    this.currentSection--;
    console.log('ApplicationmodelService: previousSection - currentSection=',
      this.currentSection, 'contentCollection.collection.length', this.contentCollection.collection.length);
    if (this.currentSection <= 0) {
      this.previousCollection();
    } else {
      this.runContent();
    }
  }

  public nextSection(): void {
    this.currentSection++;
    console.log('ApplicationmodelService: nextSection - currentSection=',
      this.currentSection, 'contentCollection.collection.length', this.contentCollection.collection.length);
    if (this.currentSection >= this.contentCollection.collection.length - 1) {
      this.nextCollection();
    } else {
      this.runContent();
    }
  }

  get autoPlay(): boolean {
    return this.contentCollection.autoplay;
  }

  get isFirstSection(): boolean {
    return (
      (this.currentActive <= 0) && (this.currentSection <= 0)
    );
  }

  get isLastSectionInCollection(): boolean {
    return (
      (this.currentSection >= this.contentCollection.collection.length - 1)
    );
  }

  get isLastSection(): boolean {
    return (
      (this.currentActive >= this.initValues.files.length - 1) &&
      (this.currentSection >= this.contentCollection.collection.length - 1)
    );
  }

  private previousCollection(): void {
    this.currentActive--;
    console.log('ApplicationmodelService: previousCollection - currentActive=',
      this.currentActive, 'initValues.files.length', this.initValues.files.length);
    if (this.currentActive >= 0) {
      this.load(this.initValues.files[this.currentActive]);
    } else {
      // start
    }
  }

  private nextCollection(): void {
    this.currentActive++;
    console.log('ApplicationmodelService: nextSection - currentActive=',
      this.currentActive, 'initValues.files.length', this.initValues.files.length);
    if (this.currentActive <= this.initValues.files.length - 1) {
      this.load(this.initValues.files[this.currentActive]);
    } else {
      // finished
    }
  }

  private loadFailed(error): void {
    console.log('ApplicationmodelService: loadFailed - error = ', error);
  }

  private runContent(): void {
    const functionalityType = this.contentCollection.collection[this.currentSection].contentLogic.functionalityType;
    this.navigateToRoute(this.config[functionalityType][this.config[functionalityType][2]]);
    this.updateConfig(functionalityType);
  }

  private updateConfig(value: number): void {
    this.config[value][2] = (this.config[value][2] === 0) ? 1 : 0;
  }
  private navigateToRoute(value: string): void {
    this.router.navigateByUrl(value);
  }

}

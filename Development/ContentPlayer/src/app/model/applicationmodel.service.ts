import {CommonloaderService} from './commonloader.service';
import {Content} from './content';
import {DataloaderService} from './dataloader.service';
import {ExternalcommunicationService} from './externalcommunication.service';
import {HttphandlerService} from './httphandler.service';
import {InitializationAPI, Helper} from './initializationapi';
import {DataHandler} from './interfaces/dataHandler';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class ApplicationmodelService {
  private externalCommunication: ExternalcommunicationService;
  private dataLoader: DataloaderService;
  private dataHandler: DataHandler;
  private httpHandler: HttphandlerService;
  private initValues: InitializationAPI;
  private currentActive: number; // nugget
  private commonLoader: CommonloaderService;
  private contentCollection: Array<Content>;
  private router: Router;
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
    this.init();
  }

  private init(): void {
    console.log('ApplicationmodelService: init');

    // load startup config
    this.httpHandler.get('./assets/config/init.json', this.initLoaded.bind(this), this.initFailed.bind(this));
  }

  get content(): Content {
    return this.contentCollection[this.currentSection];
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
      this.dataHandler.loadData(data.environment.lms, this.baseLoaded.bind(this), this.baseFailed.bind(this));
    } else if (data.environment.standalone.enabled) {
      console.log('ApplicationmodelService: initLoaded - environment.standalone.enabled = true');
      this.dataHandler = this.dataLoader;
      this.dataHandler.loadData(data.environment.standalone, this.baseLoaded.bind(this), this.baseFailed.bind(this));
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

  private initFailed(error): void {
    console.log('ApplicationmodelService: initFailed - error = ', error);
  }

  private load(value: Helper): void {
    console.log('ApplicationmodelService: load - value = ', value);
    this.commonLoader.createContent(value, this.loadCompleted.bind(this), this.loadFailed.bind(this));

  }

  private loadCompleted(c: Array<Content>): void {
    console.log('ApplicationmodelService: loadCompleted - c = ', c);
    this.contentCollection = c;
    this.currentSection = 0;
    this.runContent();
  }

  public nextSection(): void {
    this.currentSection++;
    console.log('ApplicationmodelService: nextSection - currentSection=',
      this.currentSection, 'contentCollection.length', this.contentCollection.length);
    if (this.currentSection >= this.contentCollection.length - 1) {
      this.nextCollection();
    } else {
      this.runContent();
    }
  }

  private nextCollection(): void {
    this.currentActive++;
    console.log('ApplicationmodelService: nextSection - currentActive=',
      this.currentActive, 'initValues.files.length', this.initValues.files.length);
    if (this.currentActive >= this.initValues.files.length - 1) {
      this.load(this.initValues.files[this.currentActive]);
    } else {
      // finished
    }
  }

  private loadFailed(error): void {
    console.log('ApplicationmodelService: loadFailed - error = ', error);
  }

  private runContent(): void {
    const functionalityType = this.contentCollection[this.currentSection].contentLogic.functionalityType;
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

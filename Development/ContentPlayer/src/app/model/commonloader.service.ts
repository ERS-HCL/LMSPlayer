import {PlayerConstants} from '../common/playerconstants';
import {Content, ContentDesign, ContentLogic, ContentData} from './content';
import { ContentCollection } from './contentcollection';
import {HttphandlerService} from './httphandler.service';
import {Helper} from './initializationapi';
import {Injectable} from '@angular/core';

@Injectable()
export class CommonloaderService {
  private httpHandler: HttphandlerService;
  private screenData: any;
  private helper: Helper;
  private success;
  private failure;

  constructor(httpHandler: HttphandlerService) {
    this.httpHandler = httpHandler;
  }

  createContent(helper: Helper, success, failure): void {
    this.helper = helper;
    this.success = success;
    this.failure = failure;

    // load base file
    this.httpHandler.get(helper.file + PlayerConstants.BASE_FILE, this.baseLoaded.bind(this), this.loadFailed.bind(this));
  }

  private baseLoaded(data): void {
    console.log('CommonloaderService: baseLoaded - data = ', data);
    this.screenData = data;
    const localdata = [];
    for (let i = 0; i < data.contents.length; i++) {
      localdata[i] = this.helper.file + data.contents[i] + PlayerConstants.JSON_FILE_EXTENSION;
    }
    this.httpHandler.getMultiple(localdata, this.sectionsLoaded.bind(this), this.sectionsFailed.bind(this));
  }

  private loadFailed(error): void {
    console.log('CommonloaderService: loadFailed - error = ', error);
    this.failure(error);
  }


  private sectionsLoaded(data): void {
    console.log('CommonloaderService: sectionsLoaded - data = ', data);
    const section = [];
    for (let i = 0; i < data.length; i++) {
      section.push(this.helper.file + data[i].data + PlayerConstants.JSON_FILE_EXTENSION,
        this.helper.file + data[i].design + PlayerConstants.JSON_FILE_EXTENSION,
        this.helper.file + data[i].logic + PlayerConstants.JSON_FILE_EXTENSION
      );
    }
    console.log('CommonloaderService: sectionsLoaded - section = ', section);
    this.httpHandler.getMultiple(section, this.subsectionsLoaded.bind(this), this.subsectionsFailed.bind(this));
  }

  private sectionsFailed(error): void {
    console.log('CommonloaderService: sectionsFailed - error = ', error);
    this.failure(error);
  }


  private subsectionsLoaded(data): void {
    console.log('CommonloaderService: subsectionsLoaded - data = ', data);
    console.log('CommonloaderService: subsectionsLoaded - data.length = ', data.length);
    console.log('CommonloaderService: subsectionsLoaded - data[2] = ', data[2]);
    const collection: Array<Content> = new Array<Content>();
    const contentCollection: ContentCollection = new ContentCollection(this.screenData.autoplay, collection);
    while (data.length >= 3) {
      const cdesign: ContentDesign = new ContentDesign();
      const clogic: ContentLogic = new ContentLogic(data[2].type);
      const cdata: ContentData = new ContentData(data[0]);
      collection.push(new Content(this.helper.file + this.screenData.contents.shift(), cdesign, cdata, clogic));
      data.splice(0, 3);
    }
    this.success(contentCollection);
  }

  private subsectionsFailed(error): void {
    console.log('CommonloaderService: subsectionsFailed - error = ', error);
    this.failure(error);
  }




}

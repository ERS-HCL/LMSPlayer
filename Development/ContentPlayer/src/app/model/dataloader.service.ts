import {InitDataReader} from './initdatareader';
import {InitializationAPI} from './initializationapi';
import {DataHandler} from './interfaces/dataHandler';
import {Injectable} from '@angular/core';

@Injectable()
export class DataloaderService implements DataHandler {
  initValues: InitializationAPI;


  constructor() {
    console.log('DataloaderService: constructor');
  }

  loadData(data, success, failure): void {
    // throw new Error('Method not implemented.');
    this.initValues = new InitDataReader().read(JSON.parse(data.data));
    this.dataLoadedSuccess(success);
    console.log('DataloaderService: loadData', this.initValues);
  }

  dataLoadedSuccess(success): void {
    success(this.initValues);
  }

  dataLoadedFailure(failure): void {
    throw new Error('Method not implemented.');
  }

}

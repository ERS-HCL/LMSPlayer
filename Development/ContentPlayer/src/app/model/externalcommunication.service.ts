import {PlayerConstants} from '../common/playerconstants';
import {InitDataReader} from './initdatareader';
import {InitializationAPI, Info} from './initializationapi';
import {DataHandler} from './interfaces/dataHandler';
import {Injectable, EventEmitter} from '@angular/core';
import {SignalR, BroadcastEventListener} from '@dharapvj/ngx-signalr';

declare var $: any;

@Injectable()
export class ExternalcommunicationService implements DataHandler {
  private signalInstance: any;
  private initValues: InitializationAPI;
  private listener;
  private success;
  private failure;

  private connection: any;

  constructor(signalInstance: SignalR) {
    console.log('ExternalcommunicationService: constructor');

    this.signalInstance = signalInstance;
  }

  connect() {
    this.signalInstance.connect().then((c) => {
      console.log('ExternalcommunicationService: connect - c=', c);
      this.connection = c;
      this.connected();
      this.call('playerReady', null);
    });

    /*const conx = this.connection = this.signalInstance.createConnection();
    this.connected();
    conx.status.subscribe((s) => console.log('ExternalcommunicationService: connect - s=', s));
    conx.start().then((c) => {
      console.log('ExternalcommunicationService: connect - c=', c);
      this.call('playerReady', null);
    });*/


  }

  call(name: string, value: any[]) {
    console.log('ExternalcommunicationService: call - name=', name, 'value=', value);
    if (!value || value.length <= 0) {
      // invoke a server side method
      this.connection.invoke(name).then((data: any[]) => {
        console.log('ExternalcommunicationService: call - data=', data);
      });

    } else {
      // invoke a server side method, with parameters
      this.connection.invoke(name, ...value).then((data: any[]) => {
        console.log('ExternalcommunicationService: call - data=', data);
      });
    }
  }

  connected() {
    console.log('ExternalcommunicationService: connected');
    // create a listener object
    const open = new BroadcastEventListener<any>('open');
    // register the listener
    this.connection.listen(open);
    // subscribe for incoming messages
    open.subscribe((value: any) => {
      console.log('ExternalcommunicationService: connected - open=', value);
      this.initValues = new InitDataReader().read(JSON.parse(value));
      this.dataLoadedSuccess();
      console.log('DataloaderService: loadData', this.initValues);
    });

    // create a listener object
    const cmsPlayerPlay = new BroadcastEventListener<any>(PlayerConstants.CMS_PLAYER_PLAY);
    // register the listener
    this.connection.listen(cmsPlayerPlay);
    // subscribe for incoming messages
    cmsPlayerPlay.subscribe((value: any) => {
      console.log('ExternalcommunicationService: connected - cmsPlayerPlay=', value);
      const info: Info = new Info(PlayerConstants.CMS_PLAYER_PLAY, value);
      this.listener(info);
    });

    // create a listener object
    const cmsPlayerPause = new BroadcastEventListener<any>(PlayerConstants.CMS_PLAYER_PAUSE);
    // register the listener
    this.connection.listen(cmsPlayerPause);
    // subscribe for incoming messages
    cmsPlayerPause.subscribe((value: any) => {
      console.log('ExternalcommunicationService: connected - cmsPlayerPause=', value);
      const info: Info = new Info(PlayerConstants.CMS_PLAYER_PAUSE, value);
      this.listener(info);
    });

    // create a listener object
    const cmsPlayerClose = new BroadcastEventListener<any>(PlayerConstants.CMS_PLAYER_CLOSE);
    // register the listener
    this.connection.listen(cmsPlayerPause);
    // subscribe for incoming messages
    cmsPlayerPause.subscribe((value: any) => {
      console.log('ExternalcommunicationService: connected - cmsPlayerClose=', value);
      const info: Info = new Info(PlayerConstants.CMS_PLAYER_CLOSE, value);
      this.listener(info);
    });
  }


  loadData(data, listener, success, failure) {
    this.listener = listener;
    this.success = success;
    this.failure = failure;
    this.connect();
  }

  sendData(id: string, data: any) {
    this.call(id, [JSON.stringify(data)]);
  }

  dataLoadedSuccess() {
    this.success(this.initValues);
  }

  dataLoadedFailure() {
    throw new Error('Method not implemented.');
  }
}

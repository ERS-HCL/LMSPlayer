import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { SignalrCustomModule } from './modules/signalr';
import { AppRoutingModule } from './modules/routing';
import { NouisliderModule } from 'ng2-nouislider';

import { AppComponent } from './app.component';
import { ContainerComponent } from './controller/container.component';
import { VideoComponent } from './controller/video.component';
import { ApplicationmodelService } from './model/applicationmodel.service';
import { CommonloaderService } from './model/commonloader.service';
import { DataloaderService } from './model/dataloader.service';
import { HttphandlerService } from './model/httphandler.service';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    VideoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SignalrCustomModule.forRoot(),
    NouisliderModule
  ],
  providers: [DataloaderService, ApplicationmodelService, CommonloaderService, HttphandlerService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(appModel: ApplicationmodelService) { }
}

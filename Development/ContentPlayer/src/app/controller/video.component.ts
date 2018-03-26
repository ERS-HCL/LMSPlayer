import {ApplicationmodelService} from '../model/applicationmodel.service';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';

declare var Slider: any;

@Component({
  selector: 'app-video',
  templateUrl: '../view/layout/video.component.html',
  styleUrls: ['../view/css/video.component.css', '../view/css/bootstrap.css',
    '../view/css/bootstrap-slider.css'],
  encapsulation: ViewEncapsulation.None,
})
export class VideoComponent implements OnInit {

  private appModel: ApplicationmodelService;

  someRange = 5;
  sliderRef = null;

  constructor(appModel: ApplicationmodelService) {
    this.appModel = appModel;
  }

  ngOnInit() {
    /*this.sliderRef = new Slider('#seek-bar', { id: "slider5a",
     * formatter: updateTimeTT, min: 0, max: 100, value: 0, forwardValue: maxtime + 1, forwardEnabled: !p });
     */
    /*this.sliderRef = new Slider('#seek-bar', { id: 'slider5a',// latest
      min: 0, max: 100, value: 0, forwardValue: 50, forwardEnabled: false });*/
  }

  get path(): string {
    console.log('VideoComponent: path=', this.appModel.content.id + '/' + this.appModel.content.contentData.data['path']);
    return this.appModel.content.id + '/' + this.appModel.content.contentData.data['path'];
  }

  get sourceType(): string {
    console.log('VideoComponent: sourceType=', this.appModel.content.contentData.data['type']);
    return this.appModel.content.contentData.data['type'];
  }

  updateHandler(event) {
    const duration = event.currentTarget.duration;
    const current = event.currentTarget.currentTime;

  }

  endedHandler(event) {
    console.log('VideoComponent: endedHandler');
    this.appModel.nextSection();
  }

}


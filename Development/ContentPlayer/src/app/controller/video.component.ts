import {PlayerConstants} from '../common/playerconstants';
import {ApplicationmodelService} from '../model/applicationmodel.service';
import {Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';

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

  private currentVideoTime;
  private duration;
  protected currentTime = 0;
  protected progressBarValue = 0;
  protected sliderRef = null;

  protected isPlaying = false;
  protected time = PlayerConstants.TIME_FORMAT;

  @ViewChild('mainVideo') mainVideo;

  constructor(appModel: ApplicationmodelService) {
    this.appModel = appModel;

    this.appModel.notification.subscribe(
      (data) => {
        console.log('VideoComponent: constructor - data=', data);
        switch (data) {
          case PlayerConstants.CMS_PLAYER_PLAY:
            this.playVideo();
            break;

          case PlayerConstants.CMS_PLAYER_PAUSE:
            this.pauseVideo();
            break;

          case PlayerConstants.CMS_PLAYER_CLOSE:
            console.log('VideoComponent: constructor - cmsPlayerClose');
            break;

          default:
            console.log('VideoComponent: constructor - default');
            break;
        }
      }
    );
  }

  ngOnInit() {
    const thisref = this;
    /*this.sliderRef = new Slider('#seek-bar', { id: "slider5a",
     * formatter: updateTimeTT, min: 0, max: 100, value: 0, forwardValue: maxtime + 1, forwardEnabled: !p });
     */
    this.sliderRef = new Slider('#seek-bar', {
      id: 'slider5a', // latest
      min: 0, max: 100, value: this.progressBarValue, forwardValue: 50, forwardEnabled: false
    });

    this.sliderRef.on('slideStop', function(event) {
      thisref.currentTime = event / (100 / thisref.duration);

    });



  }

  loadedHandler(event) {
    this.duration = event.currentTarget.duration;
    this.appModel.event = {'action': 'segmentBegins'};
  }

  updatePlay(event) {
    this.isPlaying ? this.pauseVideo() : this.playVideo();
  }

  get path(): string {
    // console.log('VideoComponent: path=', this.appModel.content.id + '/' + this.appModel.content.contentData.data['path']);
    return this.appModel.content.id + '/' + this.appModel.content.contentData.data['path'];
  }

  get sourceType(): string {
    // console.log('VideoComponent: sourceType=', this.appModel.content.contentData.data['type']);
    return this.appModel.content.contentData.data['type'];
  }

  private playVideo() {
    this.isPlaying = true;
    this.mainVideo.nativeElement.play();
    this.appModel.event = {'action': 'play'};
  }

  private pauseVideo() {
    this.isPlaying = false;
    this.mainVideo.nativeElement.pause();
    this.appModel.event = {'action': 'pause', 'time': new Date().getTime(), 'currentPosition': this.currentVideoTime};
  }

  updateHandler(event) {
    const duration = event.currentTarget.duration;
    this.currentVideoTime = event.currentTarget.currentTime;
    const value = (100 / duration) * this.currentVideoTime;
    this.progressBarValue = value;
    console.log('VideoComponent: updateHandler value=', value, this.progressBarValue);
    /*this.sliderRef.setAttribute('value', value);
    this.sliderRef.refresh();*/

    const curmins = Math.floor(this.currentVideoTime / 60);
    const cursecs = Math.floor(this.currentVideoTime - curmins * 60);
    const durmins = Math.floor(duration / 60);
    const dursecs = Math.floor(duration - durmins * 60);
    const ttime = dursecs + (durmins * 60);
    const ctime = cursecs + (curmins * 60);
    const rtime = ttime - ctime;
    const remainingt = this.convertDigits(Math.floor(rtime / 60)) + ':' + this.convertDigits(rtime % 60);
    this.time = remainingt + ' / ' + this.convertDigits(durmins) + ':' + this.convertDigits(dursecs);

    // update slider
    this.sliderRef.setValue(value, false, false);
  }

  updateVolume(event) {
    console.log('VideoComponent: updateVolume - event=', event);
    this.mainVideo.nativeElement.volume = event.target.value;
  }

  endedHandler(event) {
    console.log('VideoComponent: endedHandler');
    this.appModel.event = {'action': 'segmentEnds'};
    this.appModel.nextSection();
  }

  close(event) {
    this.appModel.event = {'action': 'exit', 'currentPosition': this.currentVideoTime};
  }

  convertDigits(value: number): string {
    if (value < 10) {
      return '0' + value;
    } else {
      return '' + value;
    }
  }

}


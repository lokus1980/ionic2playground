import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { Vibration } from '@ionic-native/vibration';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  private gyroX: number;
  private gyroY: number;
  private gyroZ: number;
  
  constructor(
    public navCtrl: NavController,
    private viewChanger: ChangeDetectorRef,
    private platform: Platform,
    private tts: TextToSpeech,
    private vibration: Vibration,
    private gyroscope: Gyroscope) {

    this.platform.ready().then(() => {

      let options: GyroscopeOptions = {
        frequency: 500
      };
          
      this.gyroscope.watch(options)
        .subscribe((orientation: GyroscopeOrientation) => {
          this.gyroX = Math.round(orientation.x * 1000) / 1000.0;
          this.gyroY = Math.round(orientation.y * 1000) / 1000.0;
          this.gyroZ = Math.round(orientation.z * 1000) / 1000.0;
          this.viewChanger.markForCheck();
        });

    });
    
  }

  vibrateAndSayHello() {    
    this.vibration.vibrate(1000);

    var currentDateString = new Date().toLocaleDateString();
    this.tts.speak( { text: `Today is ${currentDateString}`, rate: 1.5 });
  }

}

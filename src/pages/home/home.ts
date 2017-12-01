import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { ChangeDetectorRef } from '@angular/core';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private latitude: number;
  private longitude: number;
  private speed: number;
  private accuracy: number;
  private serviceProvider: string;

  private hasSpeedBeenSpokenOut: boolean = false;

  constructor(
    public navCtrl: NavController,
    private platform: Platform,
    private viewChanger: ChangeDetectorRef,
    private vibration: Vibration,
    private tts: TextToSpeech,
    private backgroundGeolocation: BackgroundGeolocation) {
    
    this.platform.ready().then(() => {

      this.turnBackgroundGeolocationOn();

    });
  }

  turnBackgroundGeolocationOn() {

    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 0,
      stationaryRadius: 2,
      distanceFilter: 1,
      interval: 500,
      activityType: "AutomotiveNavigation",
      saveBatteryOnBackground: false,
      //debug: true, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: true, // enable this to clear background location settings when the app terminates
    };

    this.backgroundGeolocation.configure(config)
      .subscribe((position: BackgroundGeolocationResponse) => {

        if (position != undefined) {
          this.latitude = position.latitude;          
          this.longitude = position.longitude;   
          this.speed = (position.speed * 3600) / 1000.0;
          this.accuracy = position.accuracy;
          this.serviceProvider = position.serviceProvider;
          
          this.viewChanger.markForCheck();

          if (this.speed > 0.0) {          
            if (!this.hasSpeedBeenSpokenOut) {

              this.vibration.vibrate(1000);
              this.tts.speak( { text: `Hey, your current speed is ${Math.round(this.speed)}`, rate: 1.5 });
              this.hasSpeedBeenSpokenOut = true;
              
              setTimeout(() => {
                this.hasSpeedBeenSpokenOut = false;
              }, 5000);

            }
          }
        }

        this.backgroundGeolocation.finish(); // FOR IOS ONLY
      });

    // start recording location
    this.backgroundGeolocation.start();
  }  
}

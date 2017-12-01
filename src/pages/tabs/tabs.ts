import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { Platform } from 'ionic-angular';
//import { BackgroundMode } from '@ionic-native/background-mode';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(private platform: Platform /*, private backgroundMode: BackgroundMode*/) {

    this.platform.ready().then(() => {

      //this.backgroundMode.enable();
      
    });

  }
}

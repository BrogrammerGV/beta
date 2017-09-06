import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';
import { Welcome1Page } from '../pages/Welcome/welcome1/welcome1';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage) {


    this.storage.get('hasSeenTutorial')
    .then((hasSeenTutorial) => {
      if (hasSeenTutorial) {
        // this.storage.get('loggedIn')
        //   .then((loggedIn) => {
        //     if (loggedIn = 'Yes') {
        //       this.rootPage = Welcome1Page;
        //       console.log("Logged In: " + loggedIn);
        //       console.log("Has Seen Tutorial: " + loggedIn);
        //     } else {
        //       this.rootPage = Welcome1Page;
        //     }

        //   });

        this.rootPage = TabsPage;
      } else {
        this.rootPage = Welcome1Page;
      }
      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
      });
    });

   
  }
}


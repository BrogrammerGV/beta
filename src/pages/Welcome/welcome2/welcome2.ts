import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { Welcome3Page } from '../welcome3/welcome3';
import { TabsPage } from '../../../pages/tabs/tabs';
/**
 * Generated class for the Welcome2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-welcome2',
  templateUrl: 'welcome2.html',
})
export class Welcome2Page {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: Storage) {
  }

  nextPage(){
    this.navCtrl.push(Welcome3Page);
  }

  skipPage(){
    this.storage.set('hasSeenTutorial', 'true');
    this.navCtrl.push(TabsPage);
  }
}

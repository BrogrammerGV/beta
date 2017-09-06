import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { TabsPage } from '../../../pages/tabs/tabs';
/**
 * Generated class for the Welcome3Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-welcome3',
  templateUrl: 'welcome3.html',
})
export class Welcome3Page {
    

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Welcome3Page');
  }

  nextPage(){
    this.storage.set('hasSeenTutorial', 'true');
    this.navCtrl.push(TabsPage);
  }

}

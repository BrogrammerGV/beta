import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SelectPage } from '../../../pages/select/select';
/**
 * Generated class for the Planning2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-planning2',
  templateUrl: 'planning2.html',
})
export class Planning2Page {
  public name: string;
  userInfo: {first: string, last: string, email: string, password: string} = {first: '', last: '', email: '', password: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.userInfo = this.navParams.get("user");
    this.name = this.userInfo.first;
    console.log('ionViewDidLoad Info2Page');
  }

  nextPage(){
    this.navCtrl.parent.parent.setRoot(SelectPage);
  }
}

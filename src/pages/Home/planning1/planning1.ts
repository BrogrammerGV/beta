import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SelectfhPage } from '../../../pages/Home/selectfh/selectfh';
/**
 * Generated class for the Planning1Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-planning1',
  templateUrl: 'planning1.html',
})
export class Planning1Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  nextPage(){
    this.navCtrl.push(SelectfhPage, {user: this.navParams.get("user")});
  }

}

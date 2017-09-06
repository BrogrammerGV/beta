import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';

/**
 * Generated class for the CareModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-care-modal',
  templateUrl: 'care-modal.html',
})
export class CareModalPage {


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController) {
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CareModalPage');
  }

  closeModal()
  {
    this.viewCtrl.dismiss();
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';

/**
 * Generated class for the ServiceRemainsModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-service-remains-modal',
  templateUrl: 'service-remains-modal.html',
})
export class ServiceRemainsModalPage {


   constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceRemainsModalPage');
  }
closeModal()
    {
      this.viewCtrl.dismiss();
    }

}

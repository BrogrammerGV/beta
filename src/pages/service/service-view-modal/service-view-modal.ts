import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';

/**
 * Generated class for the ServiceViewModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-service-view-modal',
  templateUrl: 'service-view-modal.html',
})
export class ServiceViewModalPage {

   constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceViewModalPage');
  }
closeModal()
    {
      this.viewCtrl.dismiss();
    }

}

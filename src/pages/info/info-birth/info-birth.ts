import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { InfoSsnModalPage } from '../info-ssn-modal/info-ssn-modal';
import { InfoAddrPage } from '../info-addr/info-addr';

/**
 * Generated class for the InfoBirthPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-info-birth',
  templateUrl: 'info-birth.html',
})
export class InfoBirthPage {

friendlyName: string;


//data variables

decSSN: any
 gender: any
locOfBirth: any
dateOfBirth: any



  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private storage: Storage) {
  }

ionViewCanEnter()
{
  this.friendlyName = this.navParams.get('firstName');
  this.loadFromLocalStorage();

}
  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoBirthPage');

  }





setLocalStorage()
{
  this.storage.set('decSSN', this.decSSN);
  this.storage.set('gender', this.gender);
  this.storage.set('locOfBirth', this.locOfBirth);
  this.storage.set('dateOfBirth', this.dateOfBirth)
}


loadFromLocalStorage()
    {
      try{
              this.storage.get('decSSN').then((val) => {
                          this.decSSN = val;
                        });
              this.storage.get('gender').then((val) => {
                        this.gender = val;
                        });
              this.storage.get('locOfBirth').then((val) => {
                          this.locOfBirth = val;
                        });
              this.storage.get('dateOfBirth').then((val) => {
                          this.dateOfBirth = val;
                        });
      }

      catch(err)
      {
        console.log(err);
      }

    }


goNext()
{
  this.setLocalStorage();
  this.navCtrl.push(InfoAddrPage);

}

  goBack()
  {
    this.navCtrl.pop();
  }

openSSNModal()
{
  let myModal = this.modalCtrl.create(InfoSsnModalPage);
              
myModal.present();
}

}

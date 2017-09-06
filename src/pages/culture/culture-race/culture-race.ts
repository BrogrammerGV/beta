import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { InfoSsnModalPage } from '../../info/info-ssn-modal/info-ssn-modal';
import {SelectPage} from '../../select/select';

/**
 * Generated class for the CultureRacePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-culture-race',
  templateUrl: 'culture-race.html',
})
export class CultureRacePage {
friendlyName: string;
race: any;


   constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public modalCtrl: ModalController) {
  }

ionViewCanEnter()
  {
     this.storage.get('firstName').then((val) => {
                          this.friendlyName = val;
                        });
this.loadFromLocalStorage();
           
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CultureRacePage');
  }




  setLocalStorage()
{
   this.storage.set('race', this.race);

}



loadFromLocalStorage()
    {
      try{
              this.storage.get('race').then((val) => {
                          this.race = val;
                        });
        
      }

      catch(err)
      {
        console.log(err);
      }

    }


  goBack()
  {
    this.navCtrl.pop();
  }

goNext()
{
  this.storage.set('cultureFinCheck', "Y");
  this.setLocalStorage();
  this.navCtrl.push(SelectPage)
}



openSSNModal()
{
  let myModal = this.modalCtrl.create(InfoSsnModalPage);
              
myModal.present();
}



}

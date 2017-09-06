import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CultureRacePage } from '../culture-race/culture-race';
/**
/**
 * Generated class for the CultureFatherPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-culture-father',
  templateUrl: 'culture-father.html',
})
export class CultureFatherPage {
  friendlyName: string;
  fatherFirstName: any;
  fatherMiddleName: any;
  fatherLastName: any;



   constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }


ionViewCanEnter()
  {
     this.storage.get('firstName').then((val) => {
                          this.friendlyName = val;
                        });
this.loadFromLocalStorage();
           
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CultureFatherPage');
  }







  setLocalStorage()
{
   this.storage.set('fatherFirstName', this.fatherFirstName);
  this.storage.set('fatherMiddleName', this.fatherMiddleName);
  this.storage.set('fatherLastName', this.fatherLastName);
}



loadFromLocalStorage()
    {
      try{
              this.storage.get('fatherFirstName').then((val) => {
                          this.fatherFirstName = val;
                        });
              this.storage.get('fatherMiddleName').then((val) => {
                        this.fatherMiddleName = val;
                        });
              this.storage.get('fatherLastName').then((val) => {
                          this.fatherLastName = val;
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
 
  this.setLocalStorage();
  this.navCtrl.push(CultureRacePage)
}



}

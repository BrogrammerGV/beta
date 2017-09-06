import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CultureFatherPage } from '../culture-father/culture-father'
/**
 * Generated class for the CultureParentsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-culture-parents',
  templateUrl: 'culture-parents.html',
})
export class CultureParentsPage {

  friendlyName: string;
  motherFirstName: any;
  motherMiddleName: any;
  motherLastName: any;

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
    console.log('ionViewDidLoad CultureParentsPage');
  }






  setLocalStorage()
{
   this.storage.set('motherFirstName', this.motherFirstName);
  this.storage.set('motherMiddleName', this.motherMiddleName);
  this.storage.set('motherLastName', this.motherLastName);
}



loadFromLocalStorage()
    {
      try{
              this.storage.get('motherFirstName').then((val) => {
                          this.motherFirstName = val;
                        });
              this.storage.get('motherMiddleName').then((val) => {
                        this.motherMiddleName = val;
                        });
              this.storage.get('motherLastName').then((val) => {
                          this.motherLastName = val;
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
  //this.navCtrl.push(CultureParentsPage)
  this.setLocalStorage();
  this.navCtrl.push(CultureFatherPage);
}






}

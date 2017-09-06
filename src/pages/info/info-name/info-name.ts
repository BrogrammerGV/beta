import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InfoBirthPage } from '../info-birth/info-birth';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the InfoNamePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-info-name',
  templateUrl: 'info-name.html',
})
export class InfoNamePage {

firstName: any;
middleName: any; 
lastName: any;



  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }

ionViewCanEnter()
{
  this.loadFromLocalStorage();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoNamePage');
  }




  goBack()
  {
    this.navCtrl.pop();
  }

  goNext()
  {
    this.setLocalStorage();
        let data = 
        {
          firstName : this.firstName
        }

            this.navCtrl.push(InfoBirthPage, data);


  }



setLocalStorage()
{
   this.storage.set('firstName', this.firstName);
  this.storage.set('lastName', this.lastName);
  this.storage.set('middleName', this.middleName);
}


loadFromLocalStorage()
    {
      try{
              this.storage.get('firstName').then((val) => {
                          this.firstName = val;
                        });
              this.storage.get('middleName').then((val) => {
                        this.middleName = val;
                        });
              this.storage.get('lastName').then((val) => {
                          this.lastName = val;
                        });
      }

      catch(err)
      {
        console.log(err);
      }

    }



}

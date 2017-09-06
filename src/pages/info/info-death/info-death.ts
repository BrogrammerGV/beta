import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SelectPage} from '../../select/select';
/**
 * Generated class for the InfoDeathPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-info-death',
  templateUrl: 'info-death.html',
})
export class InfoDeathPage {
friendlyName: string;

// Data Variables
dateOfDeath:any;
locOfDeathOne: any;
locOfDeathTwo: any;


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
    console.log('ionViewDidLoad InfoDeathPage');
  }

// ionViewCanLeave(): boolean
// {
//   this.storage.set("aboutCheck", 'Y');
//   console.log("This is Working Fam");
//   return true;
// }




setLocalStorage()
{
  this.storage.set('dateOfDeath', this.dateOfDeath);
  this.storage.set('locOfDeathOne', this.locOfDeathOne);
  this.storage.set('locOfDeathTwo', this.locOfDeathTwo);

}


loadFromLocalStorage()
    {
      try{
              this.storage.get('dateOfDeath').then((val) => {
                          this.dateOfDeath = val;
                        });
              this.storage.get('locOfDeathOne').then((val) => {
                        this.locOfDeathOne = val;
                        });
              this.storage.get('locOfDeathTwo').then((val) => {
                          this.locOfDeathTwo = val;
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
  this.storage.set("aboutCheck", 'Y');
  console.log("This is Working Fam");
  this.navCtrl.push(SelectPage);

}

  goBack()
  {
    this.navCtrl.pop();
  }





}

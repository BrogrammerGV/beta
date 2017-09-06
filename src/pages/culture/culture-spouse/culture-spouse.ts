import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CultureSpousecontPage} from "../culture-spousecont/culture-spousecont";
import {CultureParentsPage} from '../culture-parents/culture-parents';
/**
 * Generated class for the CultureSpousePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-culture-spouse',
  templateUrl: 'culture-spouse.html',
})
export class CultureSpousePage {
 friendlyName: string;

 //dynamic variables
 singleDialog: boolean = false;
  marriedDialog: boolean = false;
   widowedDialog: boolean = false;
    divorcedDialog: boolean = false;




  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }


  ionViewCanEnter()
  {
     this.storage.get('firstName').then((val) => {
                          this.friendlyName = val;
                        });

           
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CultureSpousePage');
  }


goNext()
{
if( this.widowedDialog || this.marriedDialog)
{
  this.navCtrl.push(CultureSpousecontPage);
}
else 
{
this.navCtrl.push(CultureParentsPage)
}

  //this.setLocalStorage();
//this.navCtrl.push(InfoHonorsPage);
}


goBack()
{
  this.navCtrl.pop();
}


showSingle()
{

this.singleDialog = true;
this.divorcedDialog = false;
this.widowedDialog = false;
this.marriedDialog = false;
}


showMarried()
{

this.singleDialog = false;
this.divorcedDialog = false;
this.widowedDialog = false;
this.marriedDialog = true;
}


showDivorced()
{

this.singleDialog = false;
this.divorcedDialog = true;
this.widowedDialog = false;
this.marriedDialog = false;
}


showWidowed()
{

this.singleDialog = false;
this.divorcedDialog = false;
this.widowedDialog = true;
this.marriedDialog = false;
}


}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { InfoHonorsPage } from '../info-honors/info-honors'
import { InfoEduPage } from '../info-edu/info-edu'
/**
 * Generated class for the InfoMilitaryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-info-military',
  templateUrl: 'info-military.html',
})
export class InfoMilitaryPage {
friendlyName: string;
militaryInfo: any;

//dynamic variables
showDialog: boolean = false;



  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }


  ionViewCanEnter()
  {
     this.storage.get('firstName').then((val) => {
                          this.friendlyName = val;
                        });
this.storage.get('militaryCheck').then((val) => {
                          this.showDialog = val;
                        });
           this.loadFromLocalStorage();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoMilitaryPage');

  }

showHistory()
{

this.showDialog = true;

}

setLocalStorage()
{
  this.storage.set('militaryInfo', this.militaryInfo);

  if(this.showDialog)
  this.storage.set('militaryCheck', true)
  else
    this.storage.set('militaryCheck', false)

}


loadFromLocalStorage()
{
  try{
          this.storage.get('militaryInfo').then((val) => {
                      this.militaryInfo = val;
                    });

  }

  catch(err)
  {
    console.log(err);
  }

}

goSkip()
{   this.storage.set('militaryCheck', false)
  this.showDialog = false;
  this.navCtrl.push(InfoEduPage);
}

goNext()
{
  this.setLocalStorage();
this.navCtrl.push(InfoHonorsPage);
}


goBack()
{
  this.navCtrl.pop();
}

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { InfoEduPage } from '../info-edu/info-edu'
/**
 * Generated class for the InfoHonorsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-info-honors',
  templateUrl: 'info-honors.html',
})
export class InfoHonorsPage {

friendlyName: string;
//dynamic variables
showDialog: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:Storage) {
  }

  ionViewCanEnter()
  {
     this.storage.get('firstName').then((val) => {
                          this.friendlyName = val;
                        });
        this.storage.get('militaryCheckTwo').then((val) => {
                          this.showDialog = val;
                        });
           
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoHonorsPage');
  }



showHistory()
{
 this.storage.set('militaryCheckTwo', true)
this.showDialog = true;

}
goBack()
{
  this.navCtrl.pop();
}



goNext()
{
this.navCtrl.push(InfoEduPage);
}


goSkip()
{
 this.navCtrl.push(InfoEduPage);
  this.storage.set('militaryCheckTwo', false)
this.showDialog = false;
}





}

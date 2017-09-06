import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {SelectPage} from '../../select/select';
/**
 * Generated class for the InfoWorkPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-info-work',
  templateUrl: 'info-work.html',
})
export class InfoWorkPage {

  friendlyName: string;
workInfo: any;

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
    console.log('ionViewDidLoad InfoWorkPage');
  }

setLocalStorage()
{
  this.storage.set('workInfo', this.workInfo);
}

loadFromLocalStorage()
{
  try{
          this.storage.get('workInfo').then((val) => {
                      this.workInfo = val;
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
this.storage.set('militaryFinCheck', 'Y');
this.navCtrl.push(SelectPage);
}


goBack()
{
  this.navCtrl.pop();
}



}

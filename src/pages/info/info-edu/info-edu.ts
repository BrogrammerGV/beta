import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { InfoWorkPage } from '../info-work/info-work'
/**
 * Generated class for the InfoEduPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-info-edu',
  templateUrl: 'info-edu.html',
})
export class InfoEduPage {

friendlyName: string;
eduInfo: any;


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
    console.log('ionViewDidLoad InfoEduPage');
  }






setLocalStorage()
{
  this.storage.set('eduInfo', this.eduInfo);
}


loadFromLocalStorage()
{
  try{
          this.storage.get('eduInfo').then((val) => {
                      this.eduInfo = val;
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
this.navCtrl.push(InfoWorkPage);
}


goBack()
{
  this.navCtrl.pop();
}



}

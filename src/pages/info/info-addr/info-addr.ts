import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InfoDeathPage } from '../info-death/info-death';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the InfoAddrPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-info-addr',
  templateUrl: 'info-addr.html',
})
export class InfoAddrPage {

friendlyName: any;
resOne: any;
resTwo: any;


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
    console.log('ionViewDidLoad InfoAddrPage');
       
  }






loadFromLocalStorage()
    {
      try{
              this.storage.get('resOne').then((val) => {
                          this.resOne = val;
                        });
              this.storage.get('resTwo').then((val) => {
                        this.resTwo = val;
                        });
            
      }

      catch(err)
      {
        console.log(err);
      }

    }



setLocalStorage()
{
  this.storage.set('resOne', this.resOne);
  this.storage.set('resTwo', this.resTwo);
}





goNext()
{
  this.setLocalStorage();
  this.navCtrl.push(InfoDeathPage);

}

  goBack()
  {
    this.navCtrl.pop();
  }


}





import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CultureParentsPage } from '../culture-parents/culture-parents';
/**
 * Generated class for the CultureSpousecontPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-culture-spousecont',
  templateUrl: 'culture-spousecont.html',
})
export class CultureSpousecontPage {

  friendlyName: string;
spouseFirstName: any;
spouseMiddleName: any;
spouseLastName: any;


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
    console.log('ionViewDidLoad CultureSpousecontPage');
  }




  setLocalStorage()
{
   this.storage.set('spouseFirstName', this.spouseFirstName);
  this.storage.set('spouseMiddleName', this.spouseMiddleName);
  this.storage.set('spouseLastName', this.spouseLastName);
}



loadFromLocalStorage()
    {
      try{
              this.storage.get('spouseFirstName').then((val) => {
                          this.spouseFirstName = val;
                        });
              this.storage.get('spouseMiddleName').then((val) => {
                        this.spouseMiddleName = val;
                        });
              this.storage.get('spouseLastName').then((val) => {
                          this.spouseLastName = val;
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
  this.navCtrl.push(CultureParentsPage)
  this.setLocalStorage();
}


}

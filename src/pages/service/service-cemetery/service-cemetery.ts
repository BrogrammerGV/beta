import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {SelectPage} from '../../select/select';
/**
 * Generated class for the ServiceCemeteryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-service-cemetery',
  templateUrl: 'service-cemetery.html',
})
export class ServiceCemeteryPage {
friendlyName: string;

 //data persistence
 cemeteryInfo: any;

//dynamic variables
yesDialog: boolean;
noDialog: boolean;



  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }


  ionViewCanEnter()
  {
    this.preLoadButton();
     this.storage.get('firstName').then((val) => {
                          this.friendlyName = val;
                        });

           
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceCemeteryPage');
  }




showYes()
{

this.yesDialog = true;
this.noDialog = false;

}


showNo()
{

this.yesDialog = false;
this.noDialog = true;

}


preLoadButton()
{
  this.storage.get('preCemetery?').then((val) => {
   
    if(val=='yes')
       this.yesDialog = true;
    if(val=='no')
       this.noDialog = true;
 
      
                        });



    this.storage.get('cemeteryInfo').then((val) => {
   
   this.cemeteryInfo = val;
  
      
                        });
                      

}

goBack()
{
  this.navCtrl.pop();
}


goNext()
{
        if( this.yesDialog)
          this.storage.set('preCemetery?', 'yes')
        if( this.noDialog)
          this.storage.set('preCemetery?', 'no')
   

          this.storage.set('cemeteryInfo', this.cemeteryInfo);

this.storage.set("servicesFinCheck", "Y");
   this.navCtrl.push(SelectPage);

}
}

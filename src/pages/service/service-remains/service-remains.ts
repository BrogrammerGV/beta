import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {ServiceRemainsModalPage} from '../service-remains-modal/service-remains-modal';
import {ServiceCemeteryPage} from '../service-cemetery/service-cemetery';
/**
 * Generated class for the ServiceRemainsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-service-remains',
  templateUrl: 'service-remains.html',
})
export class ServiceRemainsPage {

friendlyName: string;

 //data persistence
 physicalRemains: any;

 //dynamic variables
 burialDialog: boolean = false;
  cremationDialog: boolean = false;
  otherDialog: boolean = false;
  unsureDialog: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public modalCtrl: ModalController) {
  }
 

  ionViewCanEnter()
  {
    this.preLoadButton();
     this.storage.get('firstName').then((val) => {
                          this.friendlyName = val;
                        });

           
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceRemainsPage');
  }




showBurial()
{

this.burialDialog = true;
this.cremationDialog = false;
this.otherDialog = false;
this.unsureDialog = false;
}

showCremation()
{

this.burialDialog = false;
this.cremationDialog = true;
this.otherDialog = false;
this.unsureDialog = false;
}


showOther()
{

this.burialDialog = false;
this.cremationDialog = false;
this.otherDialog = true;
this.unsureDialog = false;
}

showUnsure()
{

this.burialDialog = false;
this.cremationDialog = false;
this.otherDialog = false;
this.unsureDialog = true;
}






preLoadButton()
{
  this.storage.get('remains?').then((val) => {
   
    if(val=='burial')
       this.burialDialog = true;
    if(val=='cremation')
       this.cremationDialog = true;
    if(val=='other')
       this.otherDialog = true;
    if(val =='unsure')
    this.unsureDialog = true;
      
                        });



    this.storage.get('physicalRemains').then((val) => {
   
   this.physicalRemains = val;
  
      
                        });
                      

}





goNext()
{
        if( this.burialDialog)
          this.storage.set('remains?', 'burial')
        if( this.cremationDialog)
          this.storage.set('remains?', 'cremation')
        if( this.otherDialog)
          this.storage.set('remains?', 'other')
        if( this.unsureDialog)
          this.storage.set('remains?', 'unsure')


          this.storage.set('physicalRemains', this.physicalRemains);

   this.navCtrl.push(ServiceCemeteryPage);

}
openServiceModal()
{
  let myModal = this.modalCtrl.create(ServiceRemainsModalPage);
              
myModal.present();
}


goBack()
{
  this.navCtrl.pop();
}
}

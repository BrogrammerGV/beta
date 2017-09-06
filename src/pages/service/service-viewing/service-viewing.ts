import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {ServiceViewModalPage} from '../service-view-modal/service-view-modal';
import {ServiceRemainsPage} from '../service-remains/service-remains';
/**
 * Generated class for the ServiceViewingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-service-viewing',
  templateUrl: 'service-viewing.html',
})
export class ServiceViewingPage {

 friendlyName: string;
 //data persistence
 viewingLocationOther: any;
 //dynamic variables
 publicDialog: boolean = false;
  privateDialog: boolean = false;
  bothDialog: boolean = false;
  neitherDialog: boolean = false;

//phase two dynamic variables
fhDialog: boolean = false;
graveDialog: boolean = false;
otherDialog: boolean = false;

//Dynamic Modal Page
showPhaseTwo: boolean = false;
showPhaseThree: boolean = false;

 
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
    console.log('ionViewDidLoad ServiceViewingPage');
  }




goNext()
{

if( this.publicDialog || this.privateDialog || this.bothDialog)
{
        if( this.publicDialog)
          this.storage.set('viewing?', 'public')
        if( this.privateDialog)
          this.storage.set('viewing?', 'private')
        if( this.bothDialog)
          this.storage.set('viewing?', 'both')

     this.showPhaseTwo = true;     
}


if( this.publicDialog || this.privateDialog || this.bothDialog)
{
        if( this.publicDialog)
          this.storage.set('viewing?', 'public')
        if( this.privateDialog)
          this.storage.set('viewing?', 'private')
        if( this.bothDialog)
          this.storage.set('viewing?', 'both')

     this.showPhaseTwo = true;   

   this.storage.get('viewing?').then((val) => {
   
    if(val=='fh')
       this.fhDialog = true;
    if(val=='other')
       this.otherDialog = true;
  
      
                        });
  
}


if(this.neitherDialog)
{
   this.storage.set('viewing?', 'neither')
   this.navCtrl.push(ServiceRemainsPage);
   return true;
}


if(this.otherDialog || this.fhDialog)
{
    if( this.fhDialog)
          this.storage.set('viewingWhere?', 'fh')
        if( this.otherDialog)
          this.storage.set('viewingWhere?', 'other')


    this.storage.set("viewingLocationOther", this.viewingLocationOther);      

this.navCtrl.push(ServiceRemainsPage);
}

}

showPublic()
{

this.publicDialog = true;
this.privateDialog = false;
this.bothDialog = false;
this.neitherDialog = false;
}

showPrivate()
{

this.publicDialog = false;
this.privateDialog = true;
this.bothDialog = false;
this.neitherDialog = false;
}

showBoth()
{

this.publicDialog = false;
this.privateDialog = false;
this.bothDialog = true;
this.neitherDialog = false;
}

showNeither()
{

this.publicDialog = false;
this.privateDialog = false;
this.bothDialog = false;
this.neitherDialog = true;
}

showFH()
{

this.fhDialog = true;

this.otherDialog = false;

}



showOther()
{

this.fhDialog = false;

this.otherDialog = true;

}


goBack()
{

if(this.showPhaseTwo)
{
  this.showPhaseTwo = false;
}
else {

  this.navCtrl.pop();
}

  
}

preLoadButton()
{
  this.storage.get('viewing?').then((val) => {
   
    if(val=='public')
       this.publicDialog = true;
    if(val=='private')
       this.privateDialog = true;
    if(val=='both')
       this.bothDialog = true;
    if(val =='neither')
    this.neitherDialog = true;
      
                        });

this.fhDialog = false;

this.otherDialog = false;


    this.storage.get('viewingLocationOther').then((val) => {
   
   this.viewingLocationOther = val;
  
      
                        });
                      

}


openServiceModal()
{
  let myModal = this.modalCtrl.create(ServiceViewModalPage);
              
myModal.present();
}


}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {ServiceModalPage} from '../service-modal/service-modal';
import {ServiceViewingPage} from '../service-viewing/service-viewing';


/**
 * Generated class for the ServiceDispPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-service-disp',
  templateUrl: 'service-disp.html',
})
export class ServiceDispPage {

 friendlyName: string;

 //data persistence
 serviceLocationOther: any;

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
    console.log('ionViewDidLoad ServiceDispPage');

  }




goNext()
{
if(this.neitherDialog)
{
   this.storage.set('service?', 'neither')
   this.navCtrl.push(ServiceViewingPage);
   return true;
}


if(this.otherDialog || this.fhDialog || this.graveDialog)
{
    if( this.fhDialog)
          this.storage.set('serviceWhere?', 'fh')
        if( this.graveDialog)
          this.storage.set('serviceWhere?', 'grave')
        if( this.otherDialog)
          this.storage.set('serviceWhere?', 'other')


    this.storage.set("serviceLocationOther", this.serviceLocationOther);      



this.navCtrl.push(ServiceViewingPage);



}
if( this.publicDialog || this.privateDialog || this.bothDialog)
{
        if( this.publicDialog)
          this.storage.set('service?', 'public')
        if( this.privateDialog)
          this.storage.set('service?', 'private')
        if( this.bothDialog)
          this.storage.set('service?', 'both')

     this.showPhaseTwo = true; 



}









      
  //this.setLocalStorage();
//this.navCtrl.push(InfoHonorsPage);
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
this.graveDialog = false;
this.otherDialog = false;

}

showGrave()
{

this.fhDialog = false;
this.graveDialog = true;
this.otherDialog = false;

}

showOther()
{

this.fhDialog = false;
this.graveDialog = false;
this.otherDialog = true;

}


openServiceModal()
{
  let myModal = this.modalCtrl.create(ServiceModalPage);
              
myModal.present();
}


preLoadButton()
{
  this.storage.get('service?').then((val) => {
   
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
this.graveDialog = false;
this.otherDialog = false;

    this.storage.get('serviceLocationOther').then((val) => {
   
   this.serviceLocationOther = val;
  
      
                        });
                      

}



}

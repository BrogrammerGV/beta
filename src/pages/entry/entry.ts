import { Component, ViewChild } from '@angular/core';
import {Storage} from '@ionic/storage';
import { AlertController, App, FabContainer, ItemSliding, List, ModalController, NavController, ToastController, LoadingController, Refresher } from 'ionic-angular';

/*
  To learn how to use third party libs in an
  Ionic app check out our docs here: http://ionicframework.com/docs/v2/resources/third-party-libs/
*/
// import moment from 'moment';

import {SelectPage} from '../select/select';

import { EventInfoOnePage } from '../event-info/event-info-one/event-info-one';
import { EventMainPage } from '../event-info/event-main/event-main';

//AWS Functions
declare let performMetaGet: any;



@Component({
  selector: 'page-schedule',
  templateUrl: 'entry.html'
})
export class EntryPage {
  // the list is a child of the schedule page
  // @ViewChild('scheduleList') gets a reference to the list
  // with the variable #scheduleList, `read: List` tells it to return
  // the List and not a reference to the element
  @ViewChild('scheduleList', { read: List }) scheduleList: List;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  code: any;

//Variables for Data Load
nameToUse: string;
eventTime: string;
eventDate: string;
eventMonth: string;
funeralHome: string;






  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private storage: Storage
  ) {}

  ionViewDidLoad() {
    this.app.setTitle('PostScript');
    this.doSearch();
   
  }

    
        goToCollector()
        {
          console.log(this.code)
          if(this.code == "memories")
          {
            this.storage.set('loggedIn', 'Yes');
             this.navCtrl.setRoot(SelectPage);
            this.storage.get('loggedIn').then((val) => {
            console.log('Are You Logged In?:', val);
          });
          }
        
            else{

              
              let alert = this.alertCtrl.create({
                title: 'Try Again',
                subTitle: 'Please enter the code provided by your Funeral Home Director',
                buttons: ['Try again']
              });
              alert.present();
              this.code = "Wrong Code"

            }


          }


 doSearch(){

    performMetaGet({"eventID": "guidstuff3"
    }).then(function(data: any){
 
      this.logItem(data);

    }.bind(this));

  }


goNext()
{
  //this.navCtrl.push(EventInfoOnePage);
  this.navCtrl.push(EventMainPage);
}


logItem(ref: any){
  
    var x = JSON.parse(ref.Payload)
console.log(x.Item.firstName);
   this.nameToUse = x.Item.firstName.S + " " + x.Item.lastName.S;
   this.eventDate = x.Item.eventDate.S;
   this.eventTime = x.Item.eventTime.S;
   this.funeralHome = x.Item.funeralHome.S;
   this.eventMonth = x.Item.eventMonth.S;

   
    // for (var i = 0; i < x.length; i++) {
    //   console.log(x[i]);
    // }
 
  }





            
          clearFix()
          {
            this.code = "";
            

          }

            openSocial(network: string, fab: FabContainer) {
              let loading = this.loadingCtrl.create({
                content: `Posting to ${network}`,
                duration: (Math.random() * 1000) + 500
              });
              loading.onWillDismiss(() => {
                fab.close();
              });
              loading.present();
            }



  
}

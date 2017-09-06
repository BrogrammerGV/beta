import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { EventInfoOnePage } from '../event-info-one/event-info-one';
import { EventMainPage } from '../event-main/event-main';
import { EventMainPage3 } from '../event-main3/event-main3';
import { CareModalPage } from '../care-modal/care-modal';
import { CareRegistryFirstTimeModalPage } from '../care-registry-first-time-modal/care-registry-first-time-modal';
//CareRegistryBuilding Pages:
import { CareRegistryListPage } from '../care-registry-list/care-registry-list';

/**
 * Generated class for the EventMainPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */



//AWS Functions
declare let performMetaGet: any;


@IonicPage()
@Component({
  selector: 'page-event-main2',
  templateUrl: 'event-main2.html',
})
export class EventMainPage2 {


  //Dynamic Variables 
  //Variables for Data Load
  nameToUse: string;
  eventTime: string;
  eventDate: string;
  eventMonth: string;
  funeralHome: string;
  firstName: string;



  //Bool Checks
  showEditScreen: boolean = false;
  showAddItem: boolean = false;
  hasSeenCare: boolean = false;
  careButtonText: string = "Get Started";

  //Vars
  helperText: string;
  helperText2: string;
  greetingText: string;
  messageText: string;



  //CareRegistry Add Item Variables:
  careCategory: any;
  careCategorySecondary: any;
  eventGuid: string;



  public isPlanner: boolean = false;




  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public modalCtrl: ModalController
  ) {
  }






  ionViewCanEnter() {

this.careCategorySecondary = "Participant";
console.log("NavigationCheck:" + this.isPlanner)

       this.storage.get(this.careCategorySecondary + "Shown").then((val) => {
         console.log(val)
      if(!(val == "shown")){
        let myModal = this.modalCtrl.create(CareRegistryFirstTimeModalPage, {careCategory: this.careCategorySecondary});
        myModal.present();
        this.storage.set(this.careCategorySecondary + "Shown","shown");
        console.log("Showm");
      }
    });



    this.storage.get('hasSeenCare').then((val) => {
      if (val == "Y") {
        this.hasSeenCare = true;
        this.careButtonText = "Add Care Item";
      }

    });
    //     this.storage.get('straightToAddItem').then((val) => {
    //   if (val == "Y") {
    //     this.hasSeenCare = true;
    //     this.showAddItem=true;
    //     this.careButtonText = "Add Item";
    //   }

    // });
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad EventMainPage2');
    this.storage.get('guid').then((val) => {
      console.log('Guid:', val);
      this.doSearch(val);
      this.eventGuid = val;
    });


  }



  doSearch(guid: string) {

    performMetaGet({
      "eventID": guid
    }).then(function (data: any) {

      this.logItem(data);

    }.bind(this));

  }

  logItem(ref: any) {

    var x = JSON.parse(ref.Payload)

    this.nameToUse = x.Item.firstName.S + " " + x.Item.lastName.S;
    this.eventDate = x.Item.eventDate.S;
    this.eventTime = x.Item.eventTime.S;
    this.funeralHome = x.Item.funeralHome.S;
    this.eventMonth = x.Item.eventMonth.S;
    this.firstName = x.Item.firstName.S;

    //Setting Variable Text
    this.helperText = "A Message from " + this.firstName + "'s Family";
    this.helperText2 = "Thank you for supporting our family during this difficult time We appreciate your condolences and invite you to join us as we celelbrate " + this.firstName + ".";
    this.messageText = this.helperText2;
    this.greetingText = this.helperText;

  }
  goNext() {
    this.navCtrl.push(EventInfoOnePage)
  }

goBackParticipant()
{
  this.navCtrl.setRoot(EventInfoOnePage);
}

  swapScreen() {

    this.showEditScreen = true;

  }

  removeEditScreen() {
    this.showEditScreen = false;
  }

  saveEditText() {
    if (this.greetingText)
      this.helperText = this.greetingText;
    if (this.helperText)
      this.helperText2 = this.messageText


    this.showEditScreen = false;
  }

  goToEvents() {
    let dataPass;
    dataPass = {
      eventGuid: this.eventGuid,
      pageBool: "N",
      careCategory: 'Meals'
    }
    this.storage.set('straightToAddItem', "N");
    this.careCategory = "Meals"
    console.log(this.eventGuid + " " + this.careCategory);


    this.navCtrl.push(CareRegistryListPage, dataPass);
  }

  goToFeed() {
    this.navCtrl.setRoot(EventMainPage3);
  }

  goToTransportation() {
    let dataPass;
    dataPass = {
      eventGuid: this.eventGuid,
      pageBool: "N",
      careCategory: 'Transportation'
    }
    this.storage.set('straightToAddItem', "N");
    this.careCategory = "Transportation"
    console.log(this.eventGuid + " " + this.careCategory);


    this.navCtrl.push(CareRegistryListPage, dataPass);
  }

  goToHousehold() {
    let dataPass;
    dataPass = {
      eventGuid: this.eventGuid,
      pageBool: "N",
      careCategory: 'Household'
    }
    this.storage.set('straightToAddItem', "N");
    this.careCategory = "Household"
    console.log(this.eventGuid + " " + this.careCategory);


    this.navCtrl.push(CareRegistryListPage, dataPass);
  }

  goToMisc() {
    let dataPass;
    dataPass = {
      eventGuid: this.eventGuid,
      pageBool: "N",
      careCategory: 'Misc'
    }
    this.storage.set('straightToAddItem', "N");
    this.careCategory = "Misc"
    console.log(this.eventGuid + " " + this.careCategory);


    this.navCtrl.push(CareRegistryListPage, dataPass);
  }




  getStarted() {

    if (this.careButtonText == "Get Started") {

      this.storage.set('hasSeenCare', "Y");
      this.hasSeenCare = true;
      this.careButtonText = "Add Care Item"
      //this.openCareModal();


    }
    if (this.careButtonText == "Add Care Item") {
      this.showAddItem = true;
      this.careButtonText = "Add Item"
    }
    else {

      if (this.careCategory) {
        this.goToCareItemList();
      }


    }


  }


  goBack() {
    this.showAddItem = false;
    this.careButtonText = "Add Care Item"
    this.storage.set('straightToAddItem', "N");
    this.careCategory = undefined;
  }

  openCareModal() {
    let myModal = this.modalCtrl.create(CareModalPage);

    myModal.present();
  }



  goToCareItemList() {
    let dataPass;

    if (this.careCategory) {
      dataPass = {
        eventGuid: this.eventGuid,
        pageBool: "Y",
        careCategory: this.careCategory
      }
      this.storage.set('straightToAddItem', "Y");
    }
    else {
      dataPass = {
        eventGuid: this.eventGuid,
        pageBool: "N",
        careCategory: "Meals"
      }
      this.storage.set('straightToAddItem', "N");
    }
    console.log(this.eventGuid + " " + this.careCategory);
    this.navCtrl.push(CareRegistryListPage, dataPass);
  }


  goEventNav() {
    if(this.isPlanner)
    this.navCtrl.setRoot(EventMainPage);
    else
    this.navCtrl.setRoot(EventInfoOnePage);
  }

}

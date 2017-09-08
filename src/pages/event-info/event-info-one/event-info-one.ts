import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';

import { EntryPage } from '../../entry/entry';
import { CareRegistryListPage } from '../care-registry-list/care-registry-list';
import { EventMainPage3 } from '../../event-info/event-main3/event-main3';
import { EventMainPage2 } from '../../event-info/event-main2/event-main2';
/**
 * Generated class for the EventInfoOnePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


//AWS Functions
declare let performMetaGet: any;



@IonicPage()
@Component({
  selector: 'page-event-info-one',
  templateUrl: 'event-info-one.html',
})
export class EventInfoOnePage {


  //bool switcher
  expandDialog: boolean = false;
  expandText: string = "Expand"

  //Variables for Data Load
  firstName: string;
  nameToUse: string;
  eventTime: string;
  eventDate: string;
  eventMonth: string;
  funeralHome: string;
  welcomeMessage: string;
  obitShort: string;

  //Page NAv Vars
eventID: any;

eventTimeOne = new Date();
eventTimeTwo = new Date();
eventTimeThree = new Date();




  constructor(public navCtrl: NavController, public navParams: NavParams, private calendar: Calendar) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventInfoOnePage');
    this.eventID = this.navParams.get("guid");
    this.doSearch(this.eventID);



    //to load from dynamo

  }




  calendarUpdate() {
 
    var eventDetails = this.firstName + "'s ";

    this.calendar.createEventInteractivelyWithOptions(eventDetails + "Private Family Viewing", this.funeralHome,
      "", this.eventTimeOne, this.eventTimeOne,{calendarName: "Home"})

      .then(function (data: any) { }.bind(this))
      .catch(function (data: any) { }.bind(this))
      .then(function (data: any) {

        this.calendar.createEventInteractivelyWithOptions(eventDetails + "Public Visitation", this.funeralHome,
          "", this.eventTimeTwo, this.eventTimeTwo,{calendarName: "Home"})
          .then(function (data: any) { }.bind(this))
          .catch(function (data: any) { }.bind(this))
          .then(function (data: any) {

            this.calendar.createEventInteractivelyWithOptions(eventDetails + "Funeral Service", this.funeralHome,
              "", this.eventTimeThree, this.eventTimeThree, {calendarName: "Home"})
              .then(function (data: any) { }.bind(this))
              .catch(function (data: any) { }.bind(this))
              .then(function (data: any) {

              }.bind(this));
          }.bind(this));
      }.bind(this));
  }

  doSearch(eventID) {
    //this is where we pick a guid to search
    performMetaGet({
      "eventID": eventID
    }).then(function (data: any) {
      //console.log(this);
      //console.log(data);
      this.logItem(data);

    }.bind(this));

  }



  logItem(ref: any) {

    var x = JSON.parse(ref.Payload)
    this.firstName = x.Item.firstName.S;
    this.nameToUse = x.Item.firstName.S + " " + x.Item.lastName.S;
    this.eventDate = x.Item.eventDate.S;
    this.eventTime = x.Item.eventTime.S;
    this.funeralHome = x.Item.funeralHome.S;
    this.eventMonth = x.Item.eventMonth.S;
    this.welcomeMessage = x.Item.welcomeMessage.S;
this.obitShort = x.Item.obit.S
this.obitShort = this.obitShort.substring(0,25);



  }

  goToObit() {
   this.navCtrl.push(EntryPage, {"eventID": this.eventID})
  }

  goToCare(){
    this.navCtrl.push(EventMainPage2, {"eventID": this.eventID})
  }

  goToCondol()
  {
    this.navCtrl.push(EventMainPage3, {"eventID": this.eventID})
  }


  expandHeader() {
    if (this.expandText == "Expand") {
      this.expandDialog = true;
      this.expandText = "Collapse";

    }
    else {
      this.expandDialog = false;
      this.expandText = "Expand";
    }


  }

}

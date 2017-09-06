import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';


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



  constructor(public navCtrl: NavController, public navParams: NavParams, private calendar: Calendar) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventInfoOnePage');
    this.doSearch();
  }




  calendarUpdate() {
    var startDate = new Date("August 23, 2016 7:00:00");
    var endDate = new Date("August 23, 2016 9:00:00");
    var eventDetails = this.firstName + "'s ";

    this.calendar.createEventInteractivelyWithOptions(eventDetails + "Private Family Viewing", this.funeralHome,
      "We are testing this functionality", startDate, endDate,{calendarName: "Home"})

      .then(function (data: any) { }.bind(this))
      .catch(function (data: any) { }.bind(this))
      .then(function (data: any) {

        var startDate = new Date("August 24, 2016 4:00:00");
        var endDate = new Date("August 24, 2016 8:00:00");

        this.calendar.createEventInteractivelyWithOptions(eventDetails + "Public Visitation", this.funeralHome,
          "We are testing this functionality", startDate, endDate,{calendarName: "Home"})
          .then(function (data: any) { }.bind(this))
          .catch(function (data: any) { }.bind(this))
          .then(function (data: any) {

            var startDate = new Date("August 25, 2016 10:30:00");
            var endDate = new Date("August 25, 2016 12:00:00");

            this.calendar.createEventInteractivelyWithOptions(eventDetails + "Funeral Service", this.funeralHome,
              "We are testing this functionality", startDate, endDate, {calendarName: "Home"})

              .then(function (data: any) { }.bind(this))
              .catch(function (data: any) { }.bind(this))
              .then(function (data: any) {

              }.bind(this));
          }.bind(this));
      }.bind(this));
  }

  doSearch() {
    //this is where we pick a guid to search
    performMetaGet({
      "eventID": "guidstuff3"
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



  }

  goToObit() {
   
  }

  goToCare(){
    
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

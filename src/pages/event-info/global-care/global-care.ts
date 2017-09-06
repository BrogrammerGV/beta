import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { InAppBrowser } from '@ionic-native/in-app-browser';
/**
 * Generated class for the GlobalCarePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

//AWS Helpers:
declare let lambda: any;
declare let cognitoHelper: any;
declare let performMetaGet: any;





@IonicPage()
@Component({
  selector: 'page-global-care',
  templateUrl: 'global-care.html',
})
export class GlobalCarePage {

  hasClaimed: boolean = true;
  hasNone: boolean = false;

  //Variables for Data Load
  firstName: string;
  nameToUse: string;
  careTime: any;
  careDate: Date;
  careMonth: string;
  dropOfLocation: string;
  claimedItemName: string;
  additionalInstructions: string;
  googleSearch: string;


  public careCategory: string = "";
  public careCategoryFriendlyName: string = "";
  public careCategoryDescription: string = "";
  public secondaryButtonText: string = "Edit";
  public noResultsClaimed: boolean = true;
  public noResultsAvailable: boolean = true;
  public availableItems: any[] = [];
  public claimedItems: any[] = [];
  public eventClicked: boolean = false;
  public event: any;
  public eventID: string = "";
  public userID: string = "";
  public isPlanner: boolean = false;
  public comment: string = "";







  constructor(public navCtrl: NavController, public navParams: NavParams, public calendar: Calendar, public iab: InAppBrowser, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GlobalCarePage');
    this.getData();
    this.doSearch();
  }



  getData() {
    // var userid: string = this.navParams.get("eventID");
    //var userid = undefined;
    //if (!userid){userid = "userid";}
    this.userID = "cole";
    lambda("GetPostScriptCareRegistryClaimedItems", { userID: this.userID })
      .then(function (data: any) {
        //console.log(this);
        this.showItems(data);

      }.bind(this));
  }

  showItems(ref: any) {
    this.claimedItems = [];

    for (var i = 0; i < ref.length; i++) {
      this.claimedItems.push(ref[i]);
    }

    this.claimedItems.sort(function (a, b) {
      return new Date(b.dateNeeded).getTime() - new Date(a.dateNeeded).getTime();
    });
    this.noResultsClaimed = !this.claimedItems.length;


  }


  openItem(parm: any) {

    this.event = parm;
    this.hasClaimed = false;
    this.careDate = this.event.dateNeeded.S;
    this.careTime = this.event.timeNeeded.S;
    this.dropOfLocation = this.event.dropOffLocation.S;
    this.googleSearch = this.event.dropOffLocation.S.replace(' ', '+');
    this.claimedItemName = this.event.itemName.S
    this.additionalInstructions = this.event.additionalInstructions.S
    console.log(this.careDate + " " + this.careTime + " " + this.dropOfLocation)
this.careTime = this.coleConvert(this.careTime.substring(0, 5));

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



  }

  goBack() {
    this.hasClaimed = true;
  }

  showNone() {

    this.hasNone = true;
    this.hasClaimed = false;
  }

  showClaim() {

    this.hasNone = false;
    this.hasClaimed = true;
  }



  calendarUpdate() {


    
    var startDate = new Date(this.careDate);
    var finalDate = startDate;
    startDate.setHours(0,0);
    finalDate.setHours(11, 30);

    var eventDetails = this.firstName + "'s ";
    this.calendar.createEventInteractively(this.claimedItemName, this.dropOfLocation,
      "We are testing this functionality", startDate, finalDate)

      .then( 
      (msg) =>   {this.presentAlert(); },
      (err) =>   { 
      
        console.log(finalDate)
        console.log(err);
      
      }

      ); 


    // this.calendar.createEventInteractively(this.claimedItemName, this.dropOfLocation, "Created by: PostScript:" + eventDetails , finalDate, finalDate)


  }

  openMaps() {

    let addr = this.dropOfLocation;
    const browser = this.iab.create('https://www.google.com/maps/dir/?api=1&destination=' + addr, '_blank');
  }

presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Calendar Updated',
    subTitle: 'A reminder has been added to your calendar.',
    buttons: ['Dismiss']
  });
  alert.present();
}



coleConvert(time: any) {
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  if (time.length > 1) {
      time = time.slice(1);
      time[5] = +time[0] < 12 ? ' a.m.' : ' p.m.';
      time[0] = +time[0] % 12 || 12;
      if (time[2] == "00") {
          time[1] = "";
          time[2] = "";
      }
  }
  return time.join('');
}

}


import { IonicPage, NavController, NavParams, ModalController, AlertController, Slides, Events } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { CareRegistryFirstTimeModalPage } from '../care-registry-first-time-modal/care-registry-first-time-modal';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CallNumber } from '@ionic-native/call-number';

import { DatePicker } from 'ionic2-date-picker';


import { CareRegistryAddItemPage } from '../care-registry-add-item/care-registry-add-item';
import { CareRegistryItemDetailsPage } from '../care-registry-item-details/care-registry-item-details';
import { EventMainPage2 } from '../event-main2/event-main2';
import { RegisterPage } from '../../register/register';
import { LoginComponentPage } from '../../login-component/login-component';


/**
 * Generated class for the CareRegistryListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare let lambda: any;
declare let cognitoHelper: any;
declare let AWS: any;
@IonicPage()

@Component({
    selector: 'page-care-registry-list',
    templateUrl: 'care-registry-list.html',
    providers: [DatePicker]

})



export class CareRegistryListPage {

  
  @ViewChild(Slides) slides: Slides;
  @ViewChild('footerSlides') footerSlide: Slides;

    //GUI Bool Logic
    breakfastClicked: boolean = false;
    lunchClicked: boolean = false;
    dinnerClicked: boolean = false;
    timeFilledOut: boolean = false;
    showAddItem: boolean = false;
    showAddItemAll: boolean = false;
    showConfirm: boolean = false;


    //intra-page nav variables
    mealDate: string;
    mealTime: any;
    footerButtonText: string = "Add Item";

    itemDate: string;


    //AWS Variables
    additionalInstructions: string;
    dropOffLocation: string;

    careItemName: string;
    careItemShort: string;
    careItemDate: string;


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
  public isPlanner: boolean = false;;
  public comment: string = "";
  public phoneNum: string = "";
  public deceasedFirst: string = "";
  public userFirst: string = "";
  public addOrEdit: string = "Add";

    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
        public datePicker: DatePicker, public alertCtrl: AlertController,public callNumber: CallNumber, public socialSharing: SocialSharing, public eventHandler: Events, public storage: Storage) {


    }


    ionViewDidLoad() {
    


        this.slides.lockSwipes(true);
        this.footerSlide.lockSwipes(true);
        let x: string = this.navParams.get('pageBool');
        this.careCategory = this.navParams.get("careCategory");
        this.deceasedFirst = this.navParams.get("firstName");
      

        if (x == 'Y') {

            if (this.careCategory == 'Meals') {
                this.showAddItem = true;
                this.footerButtonText = "Next";
            }
            else {
                this.showAddItemAll = true;
                this.footerButtonText = "Add Item";
            }
        }
        else {
          this.storage.get(this.careCategory + "Shown").then((val) => {
      if(!(val == "shown")){
        let myModal = this.modalCtrl.create(CareRegistryFirstTimeModalPage, {careCategory: this.careCategory});
        myModal.present();
        this.storage.set(this.careCategory + "Shown","shown");
      }
    });
        }


       this.loadCareCategoryInformation();
        this.getData();
        this.eventHandler.unsubscribe("goToLogin");
        this.eventHandler.unsubscribe("registered");
        this.eventHandler.unsubscribe("loggedIn");
        this.eventHandler.subscribe("goToLogin",(data:any)=>{this.moveSlides(4);});
        this.eventHandler.subscribe("registered",(data:any)=>{this.moveSlides(3);});
        this.eventHandler.subscribe("loggedIn",(data:any)=>{this.moveSlides(5);});
    }

    addItem() {
      this.addOrEdit = "Add";

        if (this.showConfirm) {
            this.showConfirm = false;
            this.showAddItem = false;
            this.showAddItemAll = false;
            console.log(1);
            this.navCtrl.push(EventMainPage2);
            return;
        }
        if (this.careItemName && this.careItemShort && this.careItemDate) {
            this.showConfirm = true;console.log(2);
            this.footerButtonText = "Add Another Item"
            this.addCareItem();
            return;
        }
        if (this.timeFilledOut) {
            if (this.breakfastClicked || this.lunchClicked || this.dinnerClicked) {
                if (this.dropOffLocation && this.additionalInstructions) {
                    this.timeFilledOut = false;
                    this.showConfirm = true;
                    this.footerButtonText = "Add Another Item";
                    this.addCareItem();
                    console.log("3" + this.showConfirm);
                }
                else {
                    this.presentAlert();
                }

            }
            else {
                this.presentAlert();
            }
        }
        else {
            if (this.breakfastClicked || this.lunchClicked || this.dinnerClicked) {

                if ((this.mealDate && this.mealTime) && !this.timeFilledOut) {
                    this.mealTime = this.coleConvert(this.mealTime);
                    this.timeFilledOut = true;
                    this.footerButtonText = "Add Care Item";console.log(4);
                }
                else {
                    this.presentAlert();
                }

            }
            else {
                if (this.careCategory == 'Meals'){
                     this.showAddItem = true;
                    this.footerButtonText = "Next";
                }
                else{
                  this.showAddItemAll = true;
                  this.footerButtonText = "Add Item";
                
                }
                  

                // this.footerButtonText == "Add Another Item"
            }
        }
    }

    addCareItem(){

      var itemSubName: string = 'n/a';
      var additionalInstructions:string = 'n/a';
      var dateNeeded: string = 'n/a';
      var dropOffLocation: string = 'n/a';
      var itemName: string = 'n/a';
      var itemSubName: string = 'n/a';
      var shortDescription: string = 'n/a';
      var timeNeeded: string = 'n/a';
      var careID: string = this.generateGuid();

      if(this.addOrEdit = "Edit") careID = this.event.careID.S;

      if(this.careCategory == "Meals"){
        additionalInstructions = this.additionalInstructions;
        dateNeeded = this.mealDate;
        timeNeeded = this.mealTime;
        dropOffLocation = this.dropOffLocation;
        if(this.breakfastClicked) itemName = "Breakfast for ";
        if(this.lunchClicked) itemName = "Lunch for ";
        if(this.dinnerClicked) itemName = "Dinner for ";
        itemName += this.mealDate;
        itemSubName = "Deliver at " + this.mealTime;

      }else{
        shortDescription = this.careItemShort;
        itemName = this.careItemName;
        dateNeeded = this.careItemDate;
        itemSubName = "On " + this.careItemDate;
      }
      var params = {
        eventID: this.eventID, 
        additionalInstructions: additionalInstructions, 
        dateNeeded: dateNeeded,
        dropOffLocation: dropOffLocation,  
        itemName: itemName, 
        itemSubName:  itemSubName,
        shortDescription: shortDescription, 
        timeNeeded: timeNeeded, 
        careCategory: this.careCategory,
        careID : careID
      };

      console.log(params);
      lambda("PutCareRegistryItem",params)
      .then(function(data: any){
        //console.log(this);
        console.log(data);
        this.showItems(data);
      }.bind(this)).catch(function(err)
      {
          console.log(err)
      });
    }
    
      generateGuid(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
          return v.toString(16);
      });
    }

    loadCareCategoryInformation() {
        this.careCategory = this.navParams.get("careCategory");
        if (!this.careCategory) {
            this.careCategory = "Meals";
        }
        switch (this.careCategory) {
            case "Meals":
                this.careCategoryFriendlyName = "Meals";
                this.careCategoryDescription = "Bringing food is an easy and comfortable way for loved ones to help.";
                break;
            case "Transportation":
                this.careCategoryFriendlyName = "Transportation";
                this.careCategoryDescription = "Let your loved ones know when they can help provide transportation.";
                break;
            case "Household":
                this.careCategoryFriendlyName = "Household Tasks";
                this.careCategoryDescription = "Let loved ones assist with basic household tasks like laundry, shopping, cleaning, etc.";
                break;
            case "Misc":
                this.careCategoryFriendlyName = "Misc. Support";
                this.careCategoryDescription = "What other tasks can loved ones help with? Pet care? Childcare? Lawn care?";
                break;
        }
    }

   // openItem(parm: string) {
      //  this.navCtrl.push(CareRegistryItemDetailsPage, { itemID: parm });
  ///  }

    goBack() {
        this.navCtrl.pop();
    }

  getData(){
   this.eventID = this.navParams.get("eventID");
   console.log(this.eventID)
    lambda("GetPostScriptCareRegistry",{eventID: this.eventID, careCategory: this.careCategory})
    .then(function(data: any){
      //console.log(this);
      this.showItems(data);
    }.bind(this));

    lambda("CheckIfPlanner",{eventID: this.eventID, userID: AWS.config.credentials.identityId}).then(function(data:any){
      this.isPlanner = data;
    }.bind(this));
  }

  showItems(ref: any){
    this.availableItems = [];
    this.claimedItems = [];

    for (var i = 0; i < ref.length; i++) {
      if(ref[i].claimed.BOOL){
        this.claimedItems.push(ref[i]);
      }else{
        this.availableItems.push(ref[i]);
      }
    }

    this.claimedItems.sort(function(a, b) {
      return new Date(b.dateNeeded).getTime() - new Date(a.dateNeeded).getTime();
    });
    this.availableItems.sort(function(a, b) {
      return new Date(b.dateNeeded).getTime() - new Date(a.dateNeeded).getTime();
    });

    this.noResultsClaimed = !this.claimedItems.length;
    this.noResultsAvailable = !this.availableItems.length;
  }


    //Sharing GUI Logic
    showBreakfast() {
        this.breakfastClicked = true;
        this.lunchClicked = false;
        this.dinnerClicked = false;

    }
    showLunch() {
        this.breakfastClicked = false;
        this.lunchClicked = true;
        this.dinnerClicked = false;
    }
    showDinner() {
        this.breakfastClicked = false;
        this.lunchClicked = false;
        this.dinnerClicked = true;

    }


    //Custom View Controller/Provider for calendar popup
    showCalendar() {
        this.datePicker.showCalendar();
        this.openDatePicker()
    }
    openDatePicker() {
        this.datePicker.onDateSelected.subscribe(
            (date: string) => {
                console.log(date);
                var x = date.toString();
                this.mealDate = x.slice(4, 7) + '.' + x.slice(7, 10)
            });
    }

    showCalendarAll() {
        this.datePicker.showCalendar();
        this.openDatePickerAll()
    }
    openDatePickerAll() {
        this.datePicker.onDateSelected.subscribe(
            (date: string) => {
                console.log(date);
                var x = date.toString();
                this.careItemDate = x.slice(4, 7) + '.' + x.slice(7, 10)
            });
    }
    //End of Custom Date Pickers



  openItem(parm: any){
    this.event = parm;
    if(!this.event.claimed.BOOL || this.isPlanner){
      if(this.event.claimed.BOOL){
        this.secondaryButtonText = "Contact " + this.event.claimedByFirst.S;
      }else{
        if(this.isPlanner){
          this.secondaryButtonText = "Edit Item";
        }else{
          this.secondaryButtonText = "Claim Task";
        }
      }
      this.moveSlides(1);
    }
  }

  secondaryButton(){
    if(this.secondaryButtonText == "Edit Item"){
      if(this.careCategory == "Meals")
      {
        this.mealDate = this.event.dateNeeded.S;
        this.mealTime = this.event.timeNeeded.S
        this.dropOffLocation = this.event.dropOffLocation.S;
        this.additionalInstructions = this.event.additionalInstructions.S;
        if(this.event.itemName.S.substring(0,1) == "B") this.showBreakfast();
        if(this.event.itemName.S.substring(0,1) == "L") this.showLunch();
        if(this.event.itemName.S.substring(0,1) == "D") this.showDinner();
        this.showAddItem = true;
        this.footerButtonText = "Edit Item";
        this.addOrEdit = "Edit";
      }
      
      else{
        this.careItemName = this.event.itemName.S;
        this.careItemShort = this.event.shortDescription.S;
        this.careItemDate = this.event.dateNeeded.S;
        this.showAddItemAll = true;
        this.footerButtonText = "Edit Item";
        this.addOrEdit = "Edit";
      }
      //this.navCtrl.push(CareRegistryAddItemPage);
    }else{
      this.contact();
    }
  }

  contact(){
    let alert = this.alertCtrl.create({
      title: 'Contact ' + this.event.claimedByFirst.S,
      message: 'How do you want to contact ' + this.event.claimedByFirst.S + '?',
      buttons: [
        {
          text: 'Call',
          handler: () => {
            this.call();
          }
        },
        {
          text: 'Text',
          handler: () => {
            this.text();
          }
        },
        {
          text: 'Email',
          handler: () => {
            this.email();
          }
        },
        {
          text: 'Cancel',
          role: "cancel",
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }

  call(){
    this.callNumber.callNumber(this.event.claimedByPhone.S, true)
  }

  text(){
    //alert(this.event.claimedByPhone.S);
    var number: string = this.event.claimedByPhone.S;
    this.socialSharing.shareViaSMS("",number).then(() => {
          // Success!
        }).catch((err) => {
          alert(err);
        });
  }

  email(){
    this.socialSharing.canShareViaEmail().then(function(){
      this.socialSharing.shareViaEmail('','',this.event.claimedByEmail.S,'','',null).then(function(){
      }).catch(function(err:any){
        alert(err);
      });
    }.bind(this)).catch(function(){
      alert("Unable to open email client.");
    });
  }

  claimTask(){
    cognitoHelper("attr").then((data:any)=>{
      this.moveSlides(5);
    }).catch((err: any)=>{
      this.moveSlides(2);
    })    
  /*
    lambda("ClaimCareRegistryTask",{eventID: this.eventID, careID: this.event.careID.S, firstName: "Danielle", lastName: "Burmeister", email: "dburmeister@homesteaderslife.com",phone:"515-822-8103"})
    .then(function(data: any){
      console.log(data);
      if(data){
        alert(data.errorMessage);
      }else{
        alert("Thank you for claiming this task.");
      }
      this.getData();
      this.goBack();
    }.bind(this))
    .catch(function(data:any){
      alert("An error has occurred, please try again later.");
      this.getData();
      this.goBack();
    }.bind(this));
    */
  }

//Helper Functions


  moveSlides(slideNum: number){
    this.slides.lockSwipes(false);
    this.slides.slideTo(slideNum);
    this.slides.lockSwipes(true);

    this.footerSlide.lockSwipes(false);
    this.footerSlide.slideTo(slideNum);
    this.footerSlide.lockSwipes(true);
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

presentAlert() {
    let alert = this.alertCtrl.create({
        subTitle: 'Please complete all the required information.',
        buttons: ['Dismiss']
    });
    alert.present();
}

validatePhone(){
  if(this.phoneNum.length != 12 || this.phoneNum.split('-').length != 3){
    alert("Please provide your phone number in 000-000-0000 format.")
  }
  else{
    cognitoHelper("attr").then((data:any)=>{
      this.userFirst = data[2].Value;
      lambda("ClaimCareRegistryTask",{eventID: this.eventID, careID: this.event.careID.S, firstName: data[2].Value, lastName: data[3].Value, email: data[4].Value,phone: this.phoneNum, userID: data[0].Value})
      .then(function(data: any){
        if(data){
          alert(data.errorMessage);
          this.getData();
          this.moveSlides(0);
  
        }else{
          this.getData();
          this.moveSlides(6);
        }
      }.bind(this))
      .catch(function(data:any){
        alert("An error has occurred, please try again later.");
        this.getData();
        this.moveSlides(0);
      }.bind(this));
    }).catch((err: any)=>{
    })    
  }
}

}

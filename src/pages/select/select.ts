import { Component } from '@angular/core';


import {
  ActionSheet,
  ActionSheetController,
  Config,
  NavController,
  ModalController,
  AlertController
} from 'ionic-angular';


import { EntryPage } from '../entry/entry';
import { Storage } from '@ionic/storage';
import { CulturePage } from '../culture/culture';
import { TabsPage } from '../tabs/tabs';

import { InfoNamePage } from '../info/info-name/info-name';
import { InfoMilitaryPage } from '../info/info-military/info-military';
import { CultureSpousePage } from '../culture/culture-spouse/culture-spouse';
import { ServiceDispPage } from '../service/service-disp/service-disp';


//AWS Declarations
declare let callLambda: any;
declare let dataJson: any;
declare let move: any;
declare let credentials: any
declare let lambda: any;
declare let AWS: any;
@Component({
  selector: 'page-select',
  templateUrl: 'select.html'
})
export class SelectPage {


  //important Variables:
  eventID: string;


  /* VARIABLES FOR AWS S3 STORAGE */
  key: string;
  namePull: any;
  disp: any;
  plotYN: any;
  cemeteryName: any;
  attendies: any;
  famView: any;
  pubPrivVis: any;
  funMemServ: any;
  celeLife: any;
  processional: any;
  lunch: any;
  gravServ: any;
  fhdirector: any;
  physicianName: any;
  military: any
  militaryServ: any
  militaryMore: any
  edu: any
  ocupation: any
  industry: any
  race: any
  hispanic: any
  NameToUse: any
  gender: any;
  dateOfBirth: any;
  birthCountry: any;
  stateofbirth: any;
  whenDie: any;
  whereDie: any;
  whereDieSpec: any;
  deathaddr: any;
  married: any;
  marStatus: any;
  spouseFirst: any;
  spouseMiddle: any;
  spouseLast: any;
  spouseLiving: any;
  motherFirst: any;
  motherMiddle: any;
  motherLast: any;
  fatherFirst: any;
  fatherMiddle: any;
  fatherLast: any;
  acolor: string;
  bcolor: string;
  ccolor: string;
  dcolor: string;
  /* VARIABLES FOR AWS S3 STORAGE */

//EventVariables
firstName: string;
lastName: string;
city: string;
state: string;




  //Dynamic Page Variables
  readyButtonText: any = "I'm Ready";
  aboutFinished: boolean = false;
  militaryFinished: boolean = false;
  cultureFinished: boolean = false;
  servicesFinished: boolean = false;




  //SelectorPage Variables
  dialUp: any;
  isenabled = true;
  isenabledinc = true;
  submit = "Submit Complete";
  //End of Useful Crap


  actionSheet: ActionSheet;
  speakers: any[] = [];
  namePass: string;
  aboutStyle: any;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public config: Config,
    private storage: Storage,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,

  ) { }

  ionViewCanEnter() {



  }




  ionViewDidLoad() {

    console.log("ionViewDidLoad SelectPage");
    this.grabFromLocalStorage()



    this.storage.get('guidCreated').then((val) => {
      if (val) {
       this.eventID = val;

        return true;
      }
      else {
        this.createNewGUID()
        return true;
      }
    });


  }

  ionViewDidEnter() {

    this.storage.get('aboutCheck').then((val) => {
      if (val == 'Y') {
        this.aboutFinished = true;
        this.readyButtonText = 'Continue'
      }
    });
    this.storage.get('militaryFinCheck').then((val) => {
      if (val == 'Y') {
        this.aboutFinished = false;
        this.militaryFinished = true;
        this.readyButtonText = 'Continue'
      }
    });

    this.storage.get('cultureFinCheck').then((val) => {
      if (val == 'Y') {
        this.aboutFinished = false;
        this.militaryFinished = false;
        this.cultureFinished = true;
        this.readyButtonText = 'Continue'
      }
    });

    this.storage.get('servicesFinCheck').then((val) => {
      if (val == 'Y') {
        this.aboutFinished = false;
        this.militaryFinished = false;
        this.cultureFinished = false;
        this.servicesFinished = true;
        this.readyButtonText = 'Submit';
      }
    });


  }




  insertRecord() {
    var jsonBuilder =
      {

        gender: this.gender,
        dateOfBirth: this.dateOfBirth,
        birthCountry: this.birthCountry,
        stateofbirth: this.stateofbirth,
        whenDie: this.whenDie,
        whereDie: this.whereDie,
        whereDieSpec: this.whereDieSpec,
        deathaddr: this.deathaddr,

        married: this.married,
        marStatus: this.marStatus,
        spouseFirst: this.spouseFirst,
        spouseMiddle: this.spouseMiddle,
        spouseLast: this.spouseLast,
        spouseLiving: this.spouseLiving,
        motherFirst: this.motherFirst,
        motherMiddle: this.motherMiddle,
        motherLast: this.motherLast,
        fatherFirst: this.fatherFirst,
        fatherMiddle: this.fatherMiddle,
        fatherLast: this.fatherLast,

        military: this.military,
        militaryServ: this.militaryServ,
        militaryMore: this.militaryMore,
        edu: this.edu,
        ocupation: this.ocupation,
        industry: this.industry,
        race: this.race,
        hispanic: this.hispanic,

        disp: this.disp,
        plotYN: this.plotYN,
        cemeteryName: this.cemeteryName,
        attendies: this.attendies,
        famView: this.famView,
        funMemServ: this.funMemServ,
        pubPrivVis: this.pubPrivVis,
        celeLife: this.celeLife,
        processional: this.processional,
        lunch: this.lunch,
        gravServ: this.gravServ,
        fhdiretor: this.fhdirector,
        physicianName: this.physicianName,


      }

    // //Set REcord For Submitted
    // var update = "Update"
    // this.storage.set('submit', update)
    // this.getSubmit()
    // //Call to AWS Lambda
    // console.log(jsonBuilder);
    // callLambda("POST", jsonBuilder);
    // //this.goToConfirm();

  }


  grabFromLocalStorage() {

    this.storage.get('gender').then((val) => {
      this.gender = val;
    });
    this.storage.get('dateOfBirth').then((val) => {
      this.dateOfBirth = val;
    });
    this.storage.get('birthCountry').then((val) => {
      this.birthCountry = val;
    });
    this.storage.get('stateofbirth').then((val) => {
      this.stateofbirth = val;
    });
    this.storage.get('whenDie').then((val) => {
      this.whenDie = val;
    });
    this.storage.get('whereDie').then((val) => {
      this.whereDie = val;
    });
    this.storage.get('whereDieSpec').then((val) => {
      this.whereDieSpec = val;
    });
    this.storage.get('gender').then((val) => {
      this.gender = val;
    });
    this.storage.get('dateOfBirth').then((val) => {
      this.dateOfBirth = val;
    });
    this.storage.get('birthCountry').then((val) => {
      this.birthCountry = val;
    });
    this.storage.get('stateofbirth').then((val) => {
      this.stateofbirth = val;
    });
    this.storage.get('whenDie').then((val) => {
      this.whenDie = val;
    });
    this.storage.get('whereDie').then((val) => {
      this.whereDie = val;
    });
    this.storage.get('whereDieSpec').then((val) => {
      this.whereDieSpec = val;
    });
    this.storage.get('military').then((val) => {
      this.military = val;
    });
    this.storage.get('militaryServ').then((val) => {
      this.militaryServ = val;
    });
    this.storage.get('militaryMore').then((val) => {
      this.militaryMore = val;
    });
    this.storage.get('edu').then((val) => {
      this.edu = val;
    });
    this.storage.get('ocupation').then((val) => {
      this.ocupation = val;
    });

    this.storage.get('industry').then((val) => {
      this.industry = val;
    });
    this.storage.get('race').then((val) => {
      this.race = val;
    });

    this.storage.get('hispanic').then((val) => {
      this.hispanic = val;
    });
    this.storage.get('disp').then((val) => {
      this.disp = val;
    });
    this.storage.get('plotYN').then((val) => {
      this.plotYN = val;
    });
    this.storage.get('attendies').then((val) => {
      this.attendies = val;
    });
    this.storage.get('funMemServ').then((val) => {
      this.funMemServ = val;
    });
    this.storage.get('famView').then((val) => {
      this.famView = val;
    });

    this.storage.get('celeLife').then((val) => {
      this.celeLife = val;
    });
    this.storage.get('processional').then((val) => {
      this.processional = val;
    });

    this.storage.get('lunch').then((val) => {
      this.lunch = val;
    });
    this.storage.get('gravServ').then((val) => {
      this.gravServ = val;
    });
    this.storage.get('pubPrivVis').then((val) => {
      this.pubPrivVis = val;
    });
    this.storage.get('cemeteryName').then((val) => {
      this.cemeteryName = val;
    });
    this.storage.get('fhdirector').then((val) => {
      this.fhdirector = val;
    });
    this.storage.get('physicianName').then((val) => {
      this.physicianName = val;
    });

    this.storage.get('married').then((val) => {
      this.married = val;
    });
    this.storage.get('marStatus').then((val) => {
      this.marStatus = val;
    });
    this.storage.get('spouseFirst').then((val) => {
      this.spouseFirst = val;
    });
    this.storage.get('spouseMiddle').then((val) => {
      this.spouseMiddle = val;
    });
    this.storage.get('spouseLast').then((val) => {
      this.spouseLast = val;
    });
    this.storage.get('motherLast').then((val) => {
      this.motherLast = val;
    });
    this.storage.get('motherFirst').then((val) => {
      this.motherFirst = val;
    });
    this.storage.get('motherMiddle').then((val) => {
      this.motherMiddle = val;
    });
    this.storage.get('fatherFirst').then((val) => {
      this.fatherFirst = val;
    });
    this.storage.get('fatherMiddle').then((val) => {
      this.fatherMiddle = val;
    });
    this.storage.get('fatherLast').then((val) => {
      this.fatherLast = val;
    });
    this.storage.get('spouseLiving').then((val) => {
      this.spouseLiving = val;
    });
    this.storage.get('firstName').then((val) => {
      this.firstName = val;
    });
    this.storage.get('lastName').then((val) => {
      this.lastName = val;
    });
    // this.storage.get('city').then((val) => {
    //   this.city = val;
    // });
    // this.storage.get('state').then((val) => {
    //   this.state = val;
    // });
this.city = "Azle"
this.state = "Texas"

  }


  getSubmit() {

    this.storage.get('submit').then((val) => {
      if (val == null || val == '')
        this.submit = 'Submit';
      else this.submit = val;
    });
  }


  goToConfirm() {

    var jsonArr = "{";
this.city = "Azle";
this.state = "Texas";

    this.storage.forEach((value, key, index) => {
      console.log('"' + key + '":"' + value + '",');
      jsonArr = jsonArr + '"' + key + '":"' + value + '",';
    }).then(function () {
      jsonArr = jsonArr.substring(0, jsonArr.length - 1);
      jsonArr = jsonArr + "}";
      var update = "Update"
      this.storage.set('submit', update)

      //callLambda("POST", jsonArr);

      console.log(jsonArr);
      lambda("EventAppLambda", { data: jsonArr, key: this.eventID, httpMethod: "POST" }
      ).then(function (data: any) {
        //console.log(this);
        console.log(data);
      }.bind(this));

    }.bind(this))

  }



  checkJson() {
this.updateEventInfo();
  }


  getAWSData()
  {
    lambda("EventAppLambda", { key: 'guid3', httpMethod: "GET" }
  ).then(function (data: any) {
    data = JSON.parse(data)
    console.log(data.firstName);
  }.bind(this));
  }


  goImReady() {

//Needs Edits

    if (this.readyButtonText == 'Continue' && this.cultureFinished) {
      this.navCtrl.push(ServiceDispPage);
    }
    if (this.readyButtonText == 'Continue' && this.aboutFinished) {

      this.navCtrl.push(InfoMilitaryPage);
    }
    if (this.readyButtonText == 'Continue' && this.militaryFinished) {

      this.navCtrl.push(CultureSpousePage);
    }
    if (this.readyButtonText == "Submit") {
      this.navCtrl.setRoot(TabsPage);   this.goToConfirm();
    }
    if (this.readyButtonText != 'Continue' && this.readyButtonText != 'Submit') {
      this.navCtrl.push(InfoNamePage);
    }

  }



  createNewGUID() {
    var newguid:string = this.generateGuid().toString();
    this.storage.set('guidCreated', newguid)
    lambda("PutPostScriptMetadata", { 
     
      key: newguid, 
      userID: credentials.identityId.toString(), 
      firstName: "n/a", 
      lastName: "n/a", 
      city: "n/a",
      state: "n/a"
      
    }
  ).then(function (data: any) {
    //console.log(this);
    console.log(data);
  }.bind(this));

  }



  generateGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });

  }





goToCulture()
{
  this.navCtrl.push(CultureSpousePage);
}

goToAbout()
{
  this.navCtrl.push(InfoNamePage);
}
goToEdu()
{
  this.navCtrl.push(InfoMilitaryPage);
}
gotToServ()
{
  this.navCtrl.push(ServiceDispPage);

}



updateEventInfo()
{ 
console.log("eventID:" + this.eventID)
console.log("eventID:" + credentials.identityId.toString())
console.log("eventID:" + this.firstName)
console.log("eventID:" + this.lastName)
console.log("eventID:" + this.city)
console.log("eventID:" + this.state)

  lambda("PutPostScriptMetadata", { 
  
   key: this.eventID, 
   userID: credentials.identityId.toString(),
   firstName: this.firstName, 
   lastName: this.lastName, 
   city: this.city,
   state: this.state
   
 }
).then(function (data: any) {
 //console.log(this);
 console.log(data);
}.bind(this));

}




}


export class AWSDataBuilder {
  constructor(x: any, y: any)
  { }

}

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


@Component({
  selector: 'page-select',
  templateUrl: 'select.html'
})
export class SelectPage {
  
/* VARIABLES FOR AWS S3 STORAGE */
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
      

//Dynamic Page Variables
readyButtonText: any = "I'm Ready";
aboutFinished: boolean = false;
militaryFinished: boolean = false;
cultureFinished: boolean = false;
servicesFinished: boolean = false;




//SelectorPage Variables
dialUp: any;
isenabled=true;
isenabledinc=true;
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

  ){}

  ionViewCanEnter()
  {
  // this.storage.get('loggedIn').then((val) => {

  //           if(val != "Yes")
  //             {
  //               return true;
  //             }
  //             else return false;
  //         });


  }

  ionViewDidLoad() {

    console.log("ionViewDidLoad SelectPage");

    callLambda("GET"); 
    //this.grabFromLocalStorage();
    //this.checkForFinal();
    //this.getSubmit(); 

//Redo This to check all values


  
  }

ionViewDidEnter()
{

this.storage.get('aboutCheck').then((val) => {
        if(val == 'Y')
    {
      this.aboutFinished = true;
      this.readyButtonText= 'Continue'
    }
        });
this.storage.get('militaryFinCheck').then((val) => {
        if(val == 'Y')
    {
      this.aboutFinished = false;
      this.militaryFinished = true;
      this.readyButtonText= 'Continue'
    }
        });
                
this.storage.get('cultureFinCheck').then((val) => {
        if(val == 'Y')
    {
      this.aboutFinished = false;
      this.militaryFinished = false;
      this.cultureFinished = true;
      this.readyButtonText= 'Continue'
    }
        });

this.storage.get('servicesFinCheck').then((val) => {
        if(val == 'Y')
    {
      this.aboutFinished = false;
      this.militaryFinished = false;
      this.cultureFinished = false;
      this.servicesFinished = true;
      this.readyButtonText= 'Submit';
    }
        });


}


//Culture and Life Data Collection
  goToCulture()
    {
      this.navCtrl.push(CultureSpousePage);
        // let nameData = {nameToUse: this.namePass}
        // let myModal = this.modalCtrl.create(CulturePage, nameData);
        //        myModal.onDidDismiss(data => { 
                 
        //          try
        //           {
        //             this.storage.set('married', data.married);
        //             this.storage.set('marStatus', data.marStatus);
        //             this.storage.set('spouseFirst', data.spouseFirst);
        //             this.storage.set('spouseMiddle', data.spouseMiddle);
        //             this.storage.set('spouseLast', data.spouseLast);
        //             this.storage.set('motherFirst', data.motherFirst);
        //             this.storage.set('motherMiddle', data.motherMiddle);
        //             this.storage.set('motherLast', data.motherLast);
        //             this.storage.set('fatherFirst', data.fatherFirst);
        //             this.storage.set('fatherMiddle', data.fatherMiddle);
        //             this.storage.set('fatherLast', data.fatherLast);
        //             this.storage.set('spouseLiving', data.spouseLiving);
        //             console.log(data);
                    
        //          }
        //           catch (err)
        //           {
        //             console.log(err);
        //           }
        //           this.modalDataCheck('ccolor', data);
        //           this.checkForFinal()
        // }); 
        //    myModal.present();
    }


//About the Deceased Data Collection
  goToAbout()
      {
        this.navCtrl.push(InfoNamePage);
        //     let nameData = {nameToUse: this.namePass}
        //     let myModal = this.modalCtrl.create(AboutModal, nameData);
        //        myModal.onDidDismiss(data => { 
                 
        //          try
        //           {
        //             this.storage.set('gender', data.gender);
        //             this.storage.set('dateOfBirth', data.dateOfBirth);
        //             this.storage.set('birthCountry', data.birthCountry);
        //             this.storage.set('stateofbirth', data.stateofbirth);
        //             this.storage.set('whenDie', data.whenDie);
        //             this.storage.set('whereDie', data.whereDie);
        //             this.storage.set('whereDieSpec', data.whereDieSpec);
        //             this.storage.set('deathaddr', data.deathaddr);
        //             console.log(data);
                     

        //          }
        //           catch (err)
        //           {
        //             console.log(err);
        //           }
        //           this.modalDataCheck('acolor', data);
        //          this.checkForFinal()
        // }); 
        //    myModal.present();
      }


//Military / WOrk / Education Data Collection
   goToEdu()
      {
        this.navCtrl.push(InfoMilitaryPage);
        // let nameData = {nameToUse: this.namePass}
        // let myModal = this.modalCtrl.create(FhPage, nameData);
        //        myModal.onDidDismiss(data => { 
                 
        //          try
        //           {
        //             this.storage.set('military', data.military);
        //             this.storage.set('militaryServ', data.militaryServ);
        //             this.storage.set('militaryMore', data.militaryMore);
        //             this.storage.set('edu', data.edu);
        //             this.storage.set('ocupation', data.ocupation);
        //             this.storage.set('industry', data.industry);
        //             this.storage.set('hispanic', data.hispanic);
        //             this.storage.set('race', data.race);
        //             console.log(data);
                 
        //          }
        //           catch (err)
        //           {
        //             console.log(err);
        //           }
        //             this.modalDataCheck('bcolor', data);
        //             this.checkForFinal()
        // }); 
        //    myModal.present();

      }




 
//Service and Memorial Data Collection 
   gotToServ()
      {
        this.navCtrl.push(ServiceDispPage);
        // let nameData = {nameToUse: this.namePass}
        // let myModal = this.modalCtrl.create(MidModalPage, nameData);
        //        myModal.onDidDismiss(data => { 
                 
        //          try
        //           {
        //             this.storage.set('disp', data.disp);
        //             this.storage.set('plotYN', data.plotYN);
        //             this.storage.set('attendies', data.attendies);
        //             this.storage.set('funMemServ', data.funMemServ);
        //             this.storage.set('famView', data.famView);
        //             this.storage.set('celeLife', data.celeLife);
        //             this.storage.set('cemeteryName', data.cemeteryName);
        //             this.storage.set('processional', data.processional);
        //             this.storage.set('lunch', data.lunch);
        //             this.storage.set('gravServ', data.gravServ);
        //             this.storage.set('pubPrivVis', data.pubPrivVis);
        //             this.storage.set('fhdirector', data.fhdirector);
        //             this.storage.set('physicianName', data.physicianName);
        //             console.log(data);
            
        //          }
        //           catch (err)
        //           {
        //             console.log(err);
        //           }
        //           this.modalDataCheck('dcolor', data);
        //             this.checkForFinal()
        // }); 
        //    myModal.present();
      }



insertRecord()
{
  
  //Inserting Record into AWS S3
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
   
              //Set REcord For Submitted
              var update = "Update"
              this.storage.set('submit', update)
              this.getSubmit()
              //Call to AWS Lambda
              callLambda("POST", jsonBuilder);
              this.goToConfirm();

}


grabFromLocalStorage(){

  

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

}


checkForFinal()
    { 
       
      
      var perc: number = 0;
         
       this.storage.forEach( (value, key, index) => {
            
        
        if(value == null|| value == '')
                {

                }
                  else {perc++;}
                    console.log(perc)
                          if(perc > 15)
                        { 
                            this.isenabledinc=false;
                            
                        }
                     if(perc > 30)
                      {
                        this.isenabled=false;
                        this.isenabledinc=true;
                        this.completeCheck();
                        return true;
                      }
                                
    })

}

completeCheck()
{
        this.acolor = "green"
        this.bcolor = "green"
        this.ccolor = "green"
        this.dcolor = "green"
}

modalDataCheck(color:any, modalData: any)
{
            for (var x in modalData) {

           
     if (modalData[x] == null)
      {
            switch(color) {
                          case "acolor":
                              this.acolor = "orange"
                              break;
                          case "bcolor":
                              this.bcolor = "orange"
                              break;
                          case "ccolor":
                              this.ccolor = "orange"
                              break;
                          case "dcolor":
                              this.dcolor = "orange"
                              break;
                          default:
                             break;
                      }
      }

                  else {
                    switch(color) {
                          case "acolor":
                              this.acolor = "green"
                              break;
                          case "bcolor":
                              this.bcolor = "green"
                              break;
                          case "ccolor":
                              this.ccolor = "green"
                              break;
                          case "dcolor":
                              this.dcolor = "green"
                              break;
                          default:
                          break;
                              
                      }
                  }
                  
}



}


getSubmit()
{
     this.storage.get('submit').then((val) => {
       if(val == null || val == '')
                    this.submit = 'Submit';
       else this.submit = val;
                      });

    // this.storage.get('firstName').then((val) => {
    //         console.log("Username: " + val)
    //         if(val == null|| val == '')
    //           this.openIntroModal();
    //           else
    //           this.namePass = val
    //         });
}


goToConfirm()
{
  // move(25);
  this.storage.clear();


// var viewData = { 
 
// "info": { }

// };



// var jsonData: any = {};


//   this.storage.forEach((value, key, index) => {
//     if(value)

//       { 
//         jsonData[key] = value;
// console.log(jsonData);
//       }


//   })

// //data.push(keys);
//callLambda("POST", jsonData); 



}

goImReady()
{
callLambda("GET");
console.log(dataJson);
if(this.readyButtonText == 'Continue' && this.cultureFinished)
{
  this.navCtrl.push(ServiceDispPage);
}


  if(this.readyButtonText == 'Continue' && this.aboutFinished)
  {

    this.navCtrl.push(InfoMilitaryPage);
  }
  if(this.readyButtonText == 'Continue' && this.militaryFinished)
  {
    
    this.navCtrl.push(CultureSpousePage);
  }

  if(this.readyButtonText == "Submit")
    {
      this.navCtrl.setRoot(TabsPage);
    }

  if(this.readyButtonText != 'Continue' && this.readyButtonText != 'Submit')

 {
    this.navCtrl.push(InfoNamePage);
  }

}


}


export class AWSDataBuilder
{
  constructor(x: any, y: any)
  {}

}
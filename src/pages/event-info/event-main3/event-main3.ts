import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Events, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { EventInfoOnePage } from '../event-info-one/event-info-one';
import { EventMainPage } from '../event-main/event-main';
import { EventMainPage2 } from '../event-main2/event-main2';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';

/**
 * Generated class for the EventMainPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */



//AWS Functions
declare let performMetaGet: any;
declare let lambda: any;
declare let cognitoHelper: any;
declare let AWS: any;

@IonicPage()
@Component({
  selector: 'page-event-main3',
  templateUrl: 'event-main3.html',
})
export class EventMainPage3 {

  
  @ViewChild(Slides) slides: Slides;
  @ViewChild('footerSlides') footerSlide: Slides;

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
  helperText: string;
  helperText2: string;
  greetingText: string;
  messageText: string;
  public condolences: any[] = [];
  public eventID: string = "";
  public noCondolences: boolean = true;
  public condolence: any;
  public isPlanner: boolean;
  public note: string = "";
  public videoData: string = "";
  public pictureData: string = "";
  public data: string = "";
  public fileName: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public eventHandler: Events, private camera: Camera, private mediaCapture: MediaCapture, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventMainPage');

    this.storage.get('guid').then((val) => {
      this.eventID = val;
      lambda("CheckIfPlanner",{eventID: this.eventID, userID: AWS.config.credentials.identityId}).then(function(data:any){
        this.isPlanner = data;
      }.bind(this));
      this.doSearch(val);
      this.getCondolences();
    });

    this.eventHandler.subscribe("goToLogin",(data:any)=>{this.moveSlides(4);});
    this.eventHandler.subscribe("registered",(data:any)=>{this.moveSlides(3);});
    this.eventHandler.subscribe("loggedIn",(data:any)=>{this.moveSlides(5);});

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

    //Setting Variable Texr
    this.helperText = "A Message from " + this.firstName + "'s Family";
    this.helperText2 = "Thank you for supporting our family during this difficult time We appreciate your condolences and invite you to join us as we celelbrate " + this.firstName + ".";
    this.messageText = this.helperText2;
    this.greetingText = this.helperText;

  }
  goNext() {
    this.navCtrl.push(EventInfoOnePage)
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
    this.navCtrl.setRoot(EventMainPage);
  }

  goToCare() {
    this.navCtrl.setRoot(EventMainPage2);
  }

  getCondolences() {
    lambda("GetPostScriptCondolences", { eventID: this.eventID })
      .then(function (data: any) {
        this.showItems(data);
      }.bind(this));
  }

  showItems(ref: any) {
    this.condolences = [];

    for (var i = 0; i < ref.length; i++) {
      this.condolences.push(ref[i]);
    }

    this.condolences.sort(function (a, b) {
      var date1: string[] = b.dateSubmitted.S.replace(/[ :]/g, "-").split("-");
      var x = new Date( +date1[0], +date1[1], +date1[2], +date1[3], +date1[4], +date1[5] );

      var date2: string[] = a.dateSubmitted.S.replace(/[ :]/g, "-").split("-");
      var y = new Date( +date2[0], +date2[1], +date2[2], +date2[3], +date2[4], +date2[5] );

      return x.getTime() - y.getTime();
    });

    this.noCondolences = !this.condolences.length;
  }

  openItem(condolence: any){
    this.condolence = condolence;
    this.moveSlides(1);
  }

  moveSlides(slideNum: number){
    this.slides.lockSwipes(false);
    this.slides.slideTo(slideNum);
    this.slides.lockSwipes(true);

    this.footerSlide.lockSwipes(false);
    this.footerSlide.slideTo(slideNum);
    this.footerSlide.lockSwipes(true);
  }

  postMessage(){
    if(!this.note){
      //this.uploadToS3(this.generateGuid(),"");
      alert("Please enter a message.");
    }else{
      console.log()
      cognitoHelper("attr").then((data:any)=>{
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        var condolenceGuid = this.generateGuid();
        lambda("PutPostScriptCondolences",{condolenceID: condolenceGuid, eventID: this.eventID, dateSubmitted: dateTime, hasPicture: this.pictureData.length > 0, hasVideo: this.videoData.length > 0, note: this.note, submittedBy: data[2].Value + ' ' + data[3].Value, userID: AWS.config.credentials.identityId})
        .then(function(data: any){
          if(data.errorMessage){
            console.log(data.errorMessage);
            alert("An error has occurred, please try again later.");
          }else{
              this.getCondolences();
              this.note = "";
              this.pictureData = "";
              this.videoData = "";
              this.moveSlides(0);
          }
        }.bind(this))
        .catch(function(data:any){
          alert("An error has occurred, please try again later.");
          console.log(data.errorMessage);
        }.bind(this));
      
        if(this.pictureData.length > 0){
          this.uploadToS3(condolenceGuid, this.pictureData);
        }
      }).catch((err: any)=>{
      })  
    }
  }

  generateGuid(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
  
  }

  addMessage(){
    cognitoHelper("attr").then((data:any)=>{
      console.log(data[2].Value);
      this.moveSlides(5);
    }).catch((err: any)=>{
      this.moveSlides(2);
    })  
  }

  addPhoto(){
    let alert = this.alertCtrl.create({
      title: 'Add or Upload Photo',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            const options: CameraOptions = {
            sourceType: this.camera.PictureSourceType.CAMERA,
            destinationType: this.camera.DestinationType.DATA_URL,      
            quality: 100,
            targetWidth: 1000,
            targetHeight: 1000,
            encodingType: this.camera.EncodingType.JPEG,      
            correctOrientation: true
          }
          
              this.camera.getPicture(options).then((imageData) => {
                // imageData is either a base64 encoded string or a file URI
                // If it's base64:
                this.videoData = "";
                this.fileName = "-picture.jpg"
                this.data = "data:image/jpg;base64," + imageData;
                this.pictureData = "data:image/jpg;base64," + imageData;
               }, (err) => {
                // Handle error
               });   
          }
        },
        {
          text: 'Photo Library',
          handler: () => {
            const options: CameraOptions = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.DATA_URL,      
            quality: 100,
            targetWidth: 1000,
            targetHeight: 1000,
            encodingType: this.camera.EncodingType.JPEG,      
            correctOrientation: true,
            mediaType: this.camera.MediaType.PICTURE
          }
          
              this.camera.getPicture(options).then((imageData) => {
                // imageData is either a base64 encoded string or a file URI
                // If it's base64:
                this.videoData = "";
                this.fileName = "-picture.jpg"
                this.data = "data:image/jpg;base64," + imageData.replace("file://","");
                this.pictureData = "data:image/jpg;base64," + imageData.replace("file://","");
               }, (err) => {
                // Handle error
               });   
          }
        },{
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }

  addVideo(){
    let alert = this.alertCtrl.create({
      title: 'Add or Upload Video',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            var options: CaptureImageOptions = { limit: 1 };
            this.mediaCapture.captureVideo(options)
              .then(
                (data: MediaFile[]) => {
                  this.pictureData = "";
                  this.fileName = data[0].name;
                  this.videoData = data[0].fullPath;
                  console.log(data);
                },
                (err: CaptureError) => console.error(err)
              );
          }
        },
        {
          text: 'Video Library',
          handler: () => {
            var options: CameraOptions = {
              mediaType: this.camera.MediaType.VIDEO,
              destinationType: this.camera.DestinationType.FILE_URI,
              targetWidth: 800,
              targetHeight: 800,
              quality: 90
          }
          
              this.camera.getPicture(options).then((imageData) => {
                // imageData is either a base64 encoded string or a file URI
                // If it's base64:
                this.pictureData = ''
                this.fileName = "-video.mov"
                this.data = imageData.replace("file://","")
                this.videoData = imageData.replace("file://","")
               }, (err) => {
                // Handle error
               });   
          }
        },{
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }

  clearPhotoVideo(){
    this.videoData = "";
    this.pictureData = "";
  }

  uploadToS3(condolenceGuid: string, filePath: string){
    // var x = new FileReader();
    // var y = new File();
    // y.readAsDataURL("file://" + this.videoData.replace(this.fileName,""),this.fileName).then(function(base64data: string){
    //       lambda("UploadToS3",{fileName: condolenceGuid + "-video", data: base64data})
    //       .then(function(data:any){console.log(data); alert("success?");}).bind(this)
    //       .catch(function(data:any){console.log(data); alert("error?");}).bind(this);
    // }).catch(err => {
    //   console.log(err);
    // });;

    // if(this.videoData.length > 0){
    //   this.file.resolveDirectoryUrl(this.videoData).then(function(data: any){alert(data)});
    //     lambda("UploadToS3",{fileName: condolenceGuid + this.fileName, data: this.videoData})
    //     .then(function(data:any){console.log(data); alert("success?");}).bind(this)
    //     .catch(function(data:any){console.log(data); alert("error?");}).bind(this);
    // }else{
      lambda("UploadToS3",{fileName: condolenceGuid + this.fileName, data: this.data})
      .then(function(data:any){console.log(data); 
        this.getCondolences();
        this.moveSlides(0);
      }).bind(this)
      .catch(function(data:any){console.log(data); alert("error");}).bind(this);
    //}
  }
}

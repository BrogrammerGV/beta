import { Component } from '@angular/core';import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { EventMainPage } from '../../event-info/event-main/event-main';
/**
 * Generated class for the EventsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare let lambda: any;
@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  public events: string[] = [];
  public counter: number = 0;
  public amountOfRecords: number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');

    this.getEvents();
  }
  

  getEvents(){

    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();

    lambda("GetPostScriptMyEvents",{userID: "us-east-1:7f084234-a51e-4c50-8636-260440d92f4a"})
    .then(function(data: any){
      this.amountOfRecords = data.length;
      this.counter = 0;
      for (var i = 0; i < data.length; i++) {
        lambda("GetPostScriptMetadata",{eventID: data[i].eventID.S})
        .then(function(data: any){
          this.events.push(data.Item);
          this.counter++;
          if(this.counter == this.amountOfRecords){
            loading.dismiss();
          }
        }.bind(this));
      }
    }.bind(this));
  }



 openEvent(item:any)
{
 // set a key/value
  this.storage.set('guid', item.eventID.S);
//   var guidData = 
//   {
//     guid: item.eventID.S
//   }
// this.navCtrl.setRoot(EventMainPage, guidData)
this.navCtrl.setRoot(EventMainPage)
}

}

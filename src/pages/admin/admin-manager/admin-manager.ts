import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TabsPage } from '../../../pages/tabs/tabs';
import { AdminAddPage } from '../admin-add/admin-add'
/**
 * Generated class for the AdminManagerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 *///AWS Functions
declare let performMetaGet: any;
declare let lambda: any;
@IonicPage()
@Component({
  selector: 'page-admin-manager',
  templateUrl: 'admin-manager.html',
})
export class AdminManagerPage {
  public events: string[] = [];
  public counter: number = 0;
  public amountOfRecords: number = 0;
  public vitalCheck: boolean = false;
  public searching: boolean = false;
  public searchText: string;


  //Search Variables
  public searchResults: string[] = [];
  public searched: boolean = false;
  public noResults: boolean = false;
  mySelectedIndex: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminManagerPage');
    this.getEvents();
  }

  getEvents() {

    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();

    lambda("GetPostScriptMyEvents", { userID: "us-east-1:7f084234-a51e-4c50-8636-260440d92f4a" })
      .then(function (data: any) {
        this.amountOfRecords = data.length;
        this.counter = 0;
        for (var i = 0; i < data.length; i++) {
          lambda("GetPostScriptMetadata", { eventID: data[i].eventID.S })
            .then(function (data: any) {


              this.events.push(data.Item);
              this.counter++;
              if (this.counter == this.amountOfRecords) {
                loading.dismiss();
              }
            }.bind(this));
        }
      }.bind(this));
  }

  doSearch(){
    this.searched = true;
    lambda("PostScriptSearch",{queryText: this.searchText
    }).then(function(data: any){
      //console.log(this);
      this.addSearchResult(data);
    }.bind(this));
  }

  addSearchResult(ref: any){
    this.searchResults = [];
    var x = ref.Items;

    for (var i = 0; i < x.length; i++) {
      console.log(x[i]);
      this.searchResults.push(x[i]);
    }
  
    this.noResults = !x.length;
    
  }


  openEvent(item: any) {
    // set a key/value
    this.storage.set('guid', item.eventID.S);
    //   var guidData = 
    //   {
    //     guid: item.eventID.S
    //   }
    // this.navCtrl.setRoot(EventMainPage, guidData)
  }


  getMonthFromString(mon) {
    return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1
  }


  goHome() {
    this.navCtrl.setRoot(TabsPage);
  }



  change()
  {

    console.log("working");
    if(this.searchText.length > 3)
      {
        this.doSearch();
    this.searching=true;
      }
      if(!this.searchText)
        {
          this.searching=false;
        }


  }

  handleSearch(){
    
  }

goToAddFile()
{
  this.navCtrl.push(AdminAddPage);
}



}



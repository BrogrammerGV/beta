import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SelectfhPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare let lambda: any;

@IonicPage()
@Component({
  selector: 'page-selectfh',
  templateUrl: 'selectfh.html',
})
export class SelectfhPage {
  
    public searchText: string = "";
    public searchResults: string[] = [];
    public searched: boolean = false;
    public noResults: boolean = false;
    mySelectedIndex: number;
    public selectedFH: any;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }
  
    ionViewDidLoad() {
    }
  
    doSearch(){
      this.searched = true;
      lambda("FuneralHomeSearch",{queryText: this.searchText
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
  
   openEvent(item:any)
  {
    alert("I do stuff!");
  }
  
  }
  
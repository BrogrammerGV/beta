import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Planning2Page } from '../../../pages/Home/planning2/planning2';

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
    public searchResults: any[] = [];
    public filteredResults: any[] = [];
    public searched: boolean = false;
    public noResults: boolean = false;
    mySelectedIndex: number;
    public selectedFH: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    }
  
    ionViewDidLoad() {
      lambda("GetPostScriptFuneralHomes",{})
      .then(function(data: any){
        this.addSearchResult(data);
      }.bind(this))
      .catch(function(err: any){}.bind(this));
    }
  
    doSearch(){
      this.searched = true;

      //search between highest and lowest zip codes
      if(this.searchText >= "00501" && this.searchText <= "99950"){
        this.http.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + this.searchText + "&key=AIzaSyAtgwKhVHbJ52A5Acka0DHONOoGeykAAuc").subscribe(function(data: any){
          console.log(data._body);
          var lat = JSON.parse(data._body).results[0].geometry.location.lat;
          var long = JSON.parse(data._body).results[0].geometry.location.lng;
  
          for(var i = 0; i < this.searchResults.length; i++){
            this.searchResults[i].distance = this.calculateDistance(lat, long, this.searchResults[i].latitude.N, this.searchResults[i].longitude.N)
          }
  
          this.filteredResults = this.searchResults.filter(function(fh){
            console.log(fh);
            return fh.distance <= 50;
          }).sort(function(a: any,b: any){
            if(a.fhName.S < b.fhName.S){
              return -1;
            }else{
              return 1;
            }
          });
          this.noResults = !this.filteredResults.length;
  
        }.bind(this));
      }else{//search name
        this.filteredResults = this.searchResults.filter(function(fh){
          return fh.fhName.S.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1;
        }.bind(this)).sort(function(a: any,b: any){
          if(a.fhName.S < b.fhName.S){
            return -1;
          }else{
            return 1;
          }
        });
        this.noResults = !this.filteredResults.length;
      }
    }
  
    addSearchResult(ref: any){
      this.searchResults = [];
      var x = ref;
  
      for (var i = 0; i < x.length; i++) {
        console.log(x[i]);
        this.searchResults.push(x[i]);
      }
      this.noResults = !x.length;
    }
  
   openEvent(item:any)
  {
    this.navCtrl.push(Planning2Page,{fhID: item.fhID.S});
  }

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number){
    var R = 6371e3; // metres
    var φ1 = lat1 * Math.PI / 180;
    var φ2 = lat2 * Math.PI / 180;
    var Δφ = (lat2-lat1) * Math.PI / 180;
    var Δλ = (lon2-lon1) * Math.PI / 180;
    
    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    var d = R * c;

    return d / 1609.34; //converts to miles from meters
  }
  
  }
  
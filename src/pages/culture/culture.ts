import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the CulturePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-culture',
  templateUrl: 'culture.html',
})
export class CulturePage {
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
        NameToUse: any;
      

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController, 
    private storage: Storage) {
  }

  ionViewDidLoad() {
        this.NameToUse = this.navParams.get('nameToUse');
 this.prePopulate();
    console.log('ionViewDidLoad CulturePage');
  }


  closeModal()
    {

    let data = 
    {
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
        fatherLast: this.fatherLast
      
    };

      this.viewCtrl.dismiss(data);

    }



prePopulate()
{
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



}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SocialSharing } from '@ionic-native/social-sharing';
/**
 * Generated class for the Search2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search2',
  templateUrl: 'search2.html',
})
export class Search2Page {

  constructor(public navCtrl: NavController, public navParams: NavParams, public socialSharing: SocialSharing) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Search2Page');
  }

  text() {
      this.socialSharing.shareViaSMS("Thank you for your thoughts and prayers following Gregory's passing. We appreciate your support during this difficult time and invite you to join us as we celebrate Gregory's life. https://efuneral.com/postscript?eventID=guidstuff",'5158228102').then(() => {
        // Success!
      }).catch((err) => {
        alert(err);
      });
  }

  email() {

    // Check if sharing via email is supported
    this.socialSharing.canShareViaEmail().then(() => {
      // Share via email
      this.socialSharing.shareViaEmail('Body', 'Subject', ['nerrickk00@hotmail.com']).then(() => {
        // Success!
      }).catch((err) => {
        alert(err);
        // Error!
      });
    }).catch((err) => {
      alert(err);
      // Sharing via email is not possible
    });
  }

  facebook() {
    // Check if sharing via email is supported
    this.socialSharing
    .shareViaFacebook('message', 'message', 'http://www.google.com')
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occurred. Show a message to the user
    });

  }

}

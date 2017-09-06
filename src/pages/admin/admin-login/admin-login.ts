import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdminManagerPage } from '../admin-manager/admin-manager'
import { SocialSharing } from '@ionic-native/social-sharing';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the AdminLoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare let loginCognitoUser: any;
declare let cognitoHelper: any;
@IonicPage()
@Component({
  selector: 'page-admin-login',
  templateUrl: 'admin-login.html',
})
export class AdminLoginPage {
  public adminUserName: string;
  public adminPassword: string;
  public confirm: boolean = false;
  public mailToURL: string;
  public confirmationCode: string;
  submitted = false;
  public userInfo: { first: string, last: string, email: string, password: string } = { first: '', last: '', email: '', password: '' };



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public social: SocialSharing,
    public storage: Storage


  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminLoginPage');

   
  }


  handleLogin() {
    if (this.confirm) {
      this.confirmCode();
    }
    else {
      this.login();
    }
  }




  forgotadminPassword() {
    if (this.adminUserName) {

      // Check if sharing via email is supported
      this.social.canShareViaEmail().then(() => {
        // Share via email
        this.social.shareViaEmail('This is a password reset request for ' + this.adminUserName, 'Reset PostScript Password', ['androiddev@homesteaderslife.com'])
          .then(function (data: any) {
            // Success!
          }.bind(this))
          .catch((err) => {
            alert(err);
            // Error!
          });
      }).catch((err) => {
        alert(err);
        // Sharing via email is not possible
      });
    } else {
      alert("Please enter an email address and then click forgot Password.");
    }
  }

  resendConfirmation() {
    cognitoHelper("resend").then(function (data: any) {
      alert("Please check your email for your new verification code.")
    });
  }

  login() { 
    if (this.adminUserName && this.adminPassword) {
      console.log("USER: " + this.adminUserName)
      console.log("PASS: " + this.adminPassword)

      loginCognitoUser(this.adminUserName, this.adminPassword)
        .then(function (data: any) {
          //console.log(this);
          this.storage.set("authToken", data);
          console.log(data);
          cognitoHelper("attr").then(function (data: any) {


            //insert FH logic here temporary redirect

            if (true)
              {

              }
              this.navCtrl.setRoot(AdminManagerPage);

            // if(this.navParams.get("searchingClicked")){
            //   this.navCtrl.setRoot(Search1Page);
            // }


          }.bind(this));


        }.bind(this))
        .catch(function (data: any) {
          if (data == "User is not confirmed.") {
            this.confirm = true;
          } else {

            alert("Invalid Username/Password combination.");
          }
        }.bind(this));
    } else {
      alert("Please enter an email address and Password.");
    }
  }


  confirmCode() {
    if (this.confirmationCode) {
      cognitoHelper("confirm", this.confirmationCode)
        .then(function (data: any) {
          this.login();
        }.bind(this))
        .catch(function (data: any) {
          alert(data);
        }.bind(this));
    } else {
      alert("Please enter a confirmation code.");
    }
  }


  forgotPassword() {
    if (this.adminUserName) {
      this.mailToURL = 'mailto:androiddev@homesteaderslife.com?subject=This is a password reset request for ' + this.adminUserName
    } else {
      this.mailToURL = 'mailto:androiddev@homesteaderslife.com?subject=This is a password reset request for N/A'
      alert("Please enter an email address and then click forgot password.");
    }
  }


}

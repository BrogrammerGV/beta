import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { TabsPage } from '../tabs/tabs';
//import { SignupPage } from '../signup/signup';
import { Planning2Page } from '../Home/planning2/planning2';
import { Search1Page } from '../Home/search1/search1';
import { SocialSharing } from '@ionic-native/social-sharing';

declare let loginCognitoUser: any;
declare let cognitoHelper: any;
/**
 * Generated class for the LoginComponentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login-component',
  templateUrl: 'login-component.html',
})
export class LoginComponentPage {

  public userName: string;
  public password: string;
  public confirm: boolean = false;
  public confirmationCode: string;
  submitted = false;
  public userInfo: {first: string, last: string, email: string, password: string} = {first: '', last: '', email: '', password: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,  public socialSharing: SocialSharing, public eventHandler: Events) { }

  ngOnInit(): any {
    this.eventHandler.unsubscribe("tryLogin");
    this.eventHandler.unsubscribe("loginBack");
    this.eventHandler.subscribe("tryLogin",(data:any)=>{this.next()});
    this.eventHandler.subscribe("loginBack",(data:any)=>{this.confirm = false});
  }

  next() {
    if (this.confirm) {
      this.confirmCode();
    }
    else {
      this.login();
    }
  }

  forgotPassword() {
    if(this.userName){
      
    // Check if sharing via email is supported
    this.socialSharing.canShareViaEmail().then(() => {
      // Share via email
      this.socialSharing.shareViaEmail('This is a password reset request for ' + this.userName, 'Reset PostScript Password', ['androiddev@homesteaderslife.com'])
      .then(function(data:any){
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
  }else{
    alert("Please enter an email address and then click forgot password.");
  }
  }

  resendConfirmation() {
    cognitoHelper("resend").then(function(data: any){
      alert("Please check your email for your new verification code.")
    });
  }

  login() {
    console.log("test2");
    if (this.userName && this.password) {
      loginCognitoUser(this.userName.toLowerCase(), this.password)
        .then(function (data: any) {
          //console.log(this);
          this.storage.set("authToken", data);
          console.log(data);
          cognitoHelper("attr").then(function(data: any){
            this.eventHandler.publish("loggedIn");
          }.bind(this));
        }.bind(this))
        .catch(function (data: any) {
          if (data == "User is not confirmed.") {
            this.confirm = true;
          } else {
            alert("Invalid username/password combination.");
          }
        }.bind(this));
    } else {
      alert("Please enter an email address and password.");
    }
  }

  confirmCode() {
    if (this.confirmationCode) {
      cognitoHelper("confirm", this.confirmationCode)
      .then(function(data: any){
        this.login();
      }.bind(this))
      .catch(function(data:any){
        alert(data);
      }.bind(this));
    } else {
      alert("Please enter a confirmation code.");
    }
  }
}
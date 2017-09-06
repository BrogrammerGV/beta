import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";


/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare let registerCognito: any;
declare let cognitoHelper: any;
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

    @Input() textCopy: string = 'Create an account or login to get started.';
  

  myForm: FormGroup;
  public userInfo: {first: string, last: string, email: string, password: string} = {first: '', last: '', email: '', password: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public eventHandler: Events, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
  }
  
  ngOnInit(): any {
    this.myForm = this.formBuilder.group({
      'firstName': ['', [Validators.required, Validators.minLength(2), this.nameValidator.bind(this)]],
      'lastName': ['', [Validators.required, Validators.minLength(2), this.nameValidator.bind(this)]],
      'password': ['', [Validators.required, Validators.minLength(8), this.passwordValidator.bind(this)]],
      'email': ['', [Validators.required, this.emailValidator.bind(this)]]
    });

    this.eventHandler.subscribe("register",(data: any)=>{ this.tryRegister();})
  }

  isValid(field: string) {
    let formField = this.myForm.get(field);
    return formField.valid;
  }

  nameValidator(control: FormControl): {[s: string]: boolean} {
    if (!control.value.match("^[a-zA-Z ,.'-]+$")) {
      return {invalidName: true};
    }
  }

  passwordValidator(control: FormControl): {[s: string]: boolean} {
    if (!control.value.match("(?=[-_a-zA-Z0-9]*?[A-Z])(?=[-_a-zA-Z0-9]*?[a-z])(?=[-_a-zA-Z0-9]*?[0-9])[-_a-zA-Z0-9]{8,}")) {
      return {invalidPassword: true};
    }
  }

  emailValidator(control: FormControl): {[s: string]: boolean} {
    if (!control.value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
      return {invalidEmail: true};
    }
  }

  login(){
    this.eventHandler.publish("goToLogin");
  }

  tryRegister(){
    var message: string = "";
    let alert = this.alertCtrl.create({
      title: 'Required',
      subTitle: '',
      buttons: ['OK']
    });
    if(!this.isValid('firstName')){
      message += "-Please provide a valid first name.<br />";
    }
    if(!this.isValid('lastName')){
      message += "-Please provide a valid last name.<br />";
    }
    if(!this.isValid('email')){
      message += "-Please provide a valid email address.<br />";
    }
    if(!this.isValid('password')){
      message += "-Password must be 8 characters and contain 1 number and capital.<br />";
    }

    if(message != ""){
      alert.setSubTitle(message);
      alert.present();
    }else{
      registerCognito({
        ClientId: '4qedlf7cu5lo5r670tk6d90d19', /* required */
        Password: this.userInfo.password, /* required */
        Username: this.userInfo.email, /* required */
        UserAttributes: [
          {
            Name: 'given_name', /* required */
            Value: this.userInfo.first
          },
          {
            Name: 'family_name', /* required */
            Value: this.userInfo.last
          },
          {
            Name: 'email', /* required */
            Value: this.userInfo.email
          },
          /* more items */
        ]

      }).then(function(data: any){
        this.eventHandler.publish("registered");
        //this.navCtrl.setRoot(Planning1Page, {user: this.userInfo});
      }.bind(this)).catch(function(err: any){
        alert.setMessage(err.message);
        alert.present();
      });
    }
  }
}

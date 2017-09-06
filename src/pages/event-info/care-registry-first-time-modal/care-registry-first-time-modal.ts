import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the CareRegistryFirstTimeModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-care-registry-first-time-modal',
  templateUrl: 'care-registry-first-time-modal.html',
})
export class CareRegistryFirstTimeModalPage {

  public careCategory: string = "";
  public careCategoryFriendlyName: string = "";
  public careCategoryDescription1: string = "";
  public careCategoryDescription2: string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CareRegistryFirstTimeModalPage');
    this.loadCareCategoryInformation();
  }
  
  closeModal()
      {
        this.viewCtrl.dismiss();
      }

  loadCareCategoryInformation() {
    this.careCategory = this.navParams.get("careCategory");
    if(!this.careCategory){
      this.careCategory = "Meals";
    }
    switch (this.careCategory) {
      case "Meals":
        this.careCategoryFriendlyName = "Meal Registry";
        this.careCategoryDescription1 = "Caring friends, family, co-workers and others often show their compassion by providing meals for the family of the deceased."
        this.careCategoryDescription2 =  "Organizing a calendar of meals helps your support system better plan and coordinate these efforts.";
        break;
      case "Transportation":
        this.careCategoryFriendlyName = "Transportation";
        this.careCategoryDescription1 = "Transportation challenges are a common source of stress when you lose a loved one."
        this.careCategoryDescription2 = "Your support system can help provide transportation for visiting relatives, aging family members and even school-aged children.";
        break;
      case "Household":
        this.careCategoryFriendlyName = "Household Tasks";
        this.careCategoryDescription1 = "Keeping up with household tasks like cleaning, laundry and grocery shopping can be a challenge."
        this.careCategoryDescription2 = "Organizing a list of these needs gives your support system tangible ways to help you and your family.";
        break;
      case "Misc":
        this.careCategoryFriendlyName = "Miscellaneous Support";
        this.careCategoryDescription1 = "In addition to the most common needs, we want you to be able to add items that uniquely benefit you and your family."
        this.careCategoryDescription2 = "This includes anything from pet care and snow removal to nursing home visits and babysitting.";
        break;
      case "Planner":
        this.careCategoryFriendlyName = "Setting Up Your Care Registry";
        this.careCategoryDescription1 = "Your loved ones want to help. Unfortunately, they don't always know what you need."
        this.careCategoryDescription2 = "Your Care Registry gives them simple, specific ways to support you and your family in the days ahead.";
        break;  
       case "Participant":
        this.careCategoryFriendlyName = "What is a Care Registry?";
        this.careCategoryDescription1 = "A Care Registry offers simple, specific ways to support friends and family in the days, weeks and months following the loss of a loved one."
        this.careCategoryDescription2 = "Simply click on a category to view and claim care items.";
        break;  
    }
  }
}

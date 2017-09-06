import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoMilitaryPage } from './info-military';

@NgModule({
  declarations: [
    InfoMilitaryPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoMilitaryPage),
  ],
  exports: [
    InfoMilitaryPage
  ]
})
export class InfoMilitaryPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoSsnModalPage } from './info-ssn-modal';

@NgModule({
  declarations: [
    InfoSsnModalPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoSsnModalPage),
  ],
  exports: [
    InfoSsnModalPage
  ]
})
export class InfoSsnModalPageModule {}

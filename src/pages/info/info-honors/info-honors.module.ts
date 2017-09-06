import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoHonorsPage } from './info-honors';

@NgModule({
  declarations: [
    InfoHonorsPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoHonorsPage),
  ],
  exports: [
    InfoHonorsPage
  ]
})
export class InfoHonorsPageModule {}

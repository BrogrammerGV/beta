import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoWorkPage } from './info-work';

@NgModule({
  declarations: [
    InfoWorkPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoWorkPage),
  ],
  exports: [
    InfoWorkPage
  ]
})
export class InfoWorkPageModule {}

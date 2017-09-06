import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoNamePage } from './info-name';

@NgModule({
  declarations: [
    InfoNamePage,
  ],
  imports: [
    IonicPageModule.forChild(InfoNamePage),
  ],
  exports: [
    InfoNamePage
  ]
})
export class InfoNamePageModule {}

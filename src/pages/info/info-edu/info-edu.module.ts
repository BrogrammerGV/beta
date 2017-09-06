import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoEduPage } from './info-edu';

@NgModule({
  declarations: [
    InfoEduPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoEduPage),
  ],
  exports: [
    InfoEduPage
  ]
})
export class InfoEduPageModule {}

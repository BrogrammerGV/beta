import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoBirthPage } from './info-birth';

@NgModule({
  declarations: [
    InfoBirthPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoBirthPage),
  ],
  exports: [
    InfoBirthPage
  ]
})
export class InfoBirthPageModule {}

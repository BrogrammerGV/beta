import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoDeathPage } from './info-death';

@NgModule({
  declarations: [
    InfoDeathPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoDeathPage),
  ],
  exports: [
    InfoDeathPage
  ]
})
export class InfoDeathPageModule {}

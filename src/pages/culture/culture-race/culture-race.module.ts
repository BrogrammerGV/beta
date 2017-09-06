import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CultureRacePage } from './culture-race';

@NgModule({
  declarations: [
    CultureRacePage,
  ],
  imports: [
    IonicPageModule.forChild(CultureRacePage),
  ],
  exports: [
    CultureRacePage
  ]
})
export class CultureRacePageModule {}

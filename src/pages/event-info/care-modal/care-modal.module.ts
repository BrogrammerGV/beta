import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CareModalPage } from './care-modal';

@NgModule({
  declarations: [
    CareModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CareModalPage),
  ],
  exports: [
    CareModalPage
  ]
})
export class CareModalPageModule {}

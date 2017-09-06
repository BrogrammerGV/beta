import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CareRegistryFirstTimeModalPage } from './care-registry-first-time-modal';

@NgModule({
  declarations: [
    CareRegistryFirstTimeModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CareRegistryFirstTimeModalPage),
  ],
  exports: [
    CareRegistryFirstTimeModalPage
  ]
})
export class CareRegistryFirstTimeModalPageModule {}

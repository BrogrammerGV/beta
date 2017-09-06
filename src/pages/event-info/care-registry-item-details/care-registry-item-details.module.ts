import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CareRegistryItemDetailsPage } from './care-registry-item-details';

@NgModule({
  declarations: [
    CareRegistryItemDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(CareRegistryItemDetailsPage),
  ],
  exports: [
    CareRegistryItemDetailsPage
  ]
})
export class CareRegistryItemDetailsPageModule {}

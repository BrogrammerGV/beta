import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CareRegistryAddItemPage } from './care-registry-add-item';

@NgModule({
  declarations: [
    CareRegistryAddItemPage,
  ],
  imports: [
    IonicPageModule.forChild(CareRegistryAddItemPage),
  ],
  exports: [
    CareRegistryAddItemPage
  ]
})
export class CareRegistryAddItemPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CareRegistryListPage } from './care-registry-list';

@NgModule({
  declarations: [
    CareRegistryListPage,
  ],
  imports: [
    IonicPageModule.forChild(CareRegistryListPage),
  ],
  exports: [
    CareRegistryListPage
  ]
})
export class CareRegistryListPageModule {}

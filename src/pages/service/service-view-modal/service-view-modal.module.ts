import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceViewModalPage } from './service-view-modal';

@NgModule({
  declarations: [
    ServiceViewModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceViewModalPage),
  ],
  exports: [
    ServiceViewModalPage
  ]
})
export class ServiceViewModalPageModule {}

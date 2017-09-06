import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceViewingPage } from './service-viewing';

@NgModule({
  declarations: [
    ServiceViewingPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceViewingPage),
  ],
  exports: [
    ServiceViewingPage
  ]
})
export class ServiceViewingPageModule {}

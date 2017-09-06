import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceModalPage } from './service-modal';

@NgModule({
  declarations: [
    ServiceModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceModalPage),
  ],
  exports: [
    ServiceModalPage
  ]
})
export class ServiceModalPageModule {}

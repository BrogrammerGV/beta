import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceRemainsModalPage } from './service-remains-modal';

@NgModule({
  declarations: [
    ServiceRemainsModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceRemainsModalPage),
  ],
  exports: [
    ServiceRemainsModalPage
  ]
})
export class ServiceRemainsModalPageModule {}

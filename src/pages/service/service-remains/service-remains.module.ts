import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceRemainsPage } from './service-remains';

@NgModule({
  declarations: [
    ServiceRemainsPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceRemainsPage),
  ],
  exports: [
    ServiceRemainsPage
  ]
})
export class ServiceRemainsPageModule {}

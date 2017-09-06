import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceCemeteryPage } from './service-cemetery';

@NgModule({
  declarations: [
    ServiceCemeteryPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceCemeteryPage),
  ],
  exports: [
    ServiceCemeteryPage
  ]
})
export class ServiceCemeteryPageModule {}

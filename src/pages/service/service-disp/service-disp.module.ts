import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceDispPage } from './service-disp';

@NgModule({
  declarations: [
    ServiceDispPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceDispPage),
  ],
  exports: [
    ServiceDispPage
  ]
})
export class ServiceDispPageModule {}

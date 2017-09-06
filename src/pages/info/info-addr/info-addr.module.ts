import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoAddrPage } from './info-addr';

@NgModule({
  declarations: [
    InfoAddrPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoAddrPage),
  ],
  exports: [
    InfoAddrPage
  ]
})
export class InfoAddrPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Welcome1Page } from './welcome1';

@NgModule({
  declarations: [
    Welcome1Page,
  ],
  imports: [
    IonicPageModule.forChild(Welcome1Page),
  ],
  exports: [
    Welcome1Page
  ]
})
export class Welcome1PageModule {}

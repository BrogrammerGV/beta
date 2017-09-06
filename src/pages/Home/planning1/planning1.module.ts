import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Planning1Page } from './planning1';

@NgModule({
  declarations: [
    Planning1Page,
  ],
  imports: [
    IonicPageModule.forChild(Planning1Page),
  ],
  exports: [
    Planning1Page
  ]
})
export class Planning1PageModule {}

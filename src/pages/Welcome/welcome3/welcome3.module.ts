import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Welcome3Page } from './welcome3';

@NgModule({
  declarations: [
    Welcome3Page,
  ],
  imports: [
    IonicPageModule.forChild(Welcome3Page),
  ],
  exports: [
    Welcome3Page
  ]
})
export class Welcome3PageModule {}

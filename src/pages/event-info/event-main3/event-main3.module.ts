import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventMainPage3 } from './event-main3';

@NgModule({
  declarations: [
    EventMainPage3,
  ],
  imports: [
    IonicPageModule.forChild(EventMainPage3),
  ],
  exports: [
    EventMainPage3
  ]
})
export class EventMainPage3Module {}

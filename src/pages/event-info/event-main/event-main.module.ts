import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventMainPage } from './event-main';

@NgModule({
  declarations: [
    EventMainPage,
  ],
  imports: [
    IonicPageModule.forChild(EventMainPage),
  ],
  exports: [
    EventMainPage
  ]
})
export class EventMainPageModule {}

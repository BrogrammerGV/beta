import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventInfoOnePage } from './event-info-one';

@NgModule({
  declarations: [
    EventInfoOnePage,
  ],
  imports: [
    IonicPageModule.forChild(EventInfoOnePage),
  ],
  exports: [
    EventInfoOnePage
  ]
})
export class EventInfoOnePageModule {}

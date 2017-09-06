import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Search2Page } from './search2';

@NgModule({
  declarations: [
    Search2Page,
  ],
  imports: [
    IonicPageModule.forChild(Search2Page),
  ],
  exports: [
    Search2Page
  ]
})
export class Search2PageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Search1Page } from './search1';

@NgModule({
  declarations: [
    Search1Page,
  ],
  imports: [
    IonicPageModule.forChild(Search1Page),
  ],
  exports: [
    Search1Page
  ]
})
export class Search1PageModule {}

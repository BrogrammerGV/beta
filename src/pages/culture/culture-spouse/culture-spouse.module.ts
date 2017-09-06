import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CultureSpousePage } from './culture-spouse';

@NgModule({
  declarations: [
    CultureSpousePage,
  ],
  imports: [
    IonicPageModule.forChild(CultureSpousePage),
  ],
  exports: [
    CultureSpousePage
  ]
})
export class CultureSpousePageModule {}

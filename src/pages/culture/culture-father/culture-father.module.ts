import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CultureFatherPage } from './culture-father';

@NgModule({
  declarations: [
    CultureFatherPage,
  ],
  imports: [
    IonicPageModule.forChild(CultureFatherPage),
  ],
  exports: [
    CultureFatherPage
  ]
})
export class CultureFatherPageModule {}

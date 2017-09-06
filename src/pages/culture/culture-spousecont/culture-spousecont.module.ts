import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CultureSpousecontPage } from './culture-spousecont';

@NgModule({
  declarations: [
    CultureSpousecontPage,
  ],
  imports: [
    IonicPageModule.forChild(CultureSpousecontPage),
  ],
  exports: [
    CultureSpousecontPage
  ]
})
export class CultureSpousecontPageModule {}

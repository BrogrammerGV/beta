import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CultureParentsPage } from './culture-parents';

@NgModule({
  declarations: [
    CultureParentsPage,
  ],
  imports: [
    IonicPageModule.forChild(CultureParentsPage),
  ],
  exports: [
    CultureParentsPage
  ]
})
export class CultureParentsPageModule {}

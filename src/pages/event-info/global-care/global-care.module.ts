import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GlobalCarePage } from './global-care';

@NgModule({
  declarations: [
    GlobalCarePage,
  ],
  imports: [
    IonicPageModule.forChild(GlobalCarePage),
  ],
  exports: [
    GlobalCarePage
  ]
})
export class GlobalCarePageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminManagerPage } from './admin-manager';

@NgModule({
  declarations: [
    AdminManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminManagerPage),
  ],
})
export class AdminManagerPageModule {}

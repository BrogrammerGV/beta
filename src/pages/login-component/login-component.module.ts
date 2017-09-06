import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginComponentPage } from './login-component';

@NgModule({
  declarations: [
    LoginComponentPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginComponentPage),
  ],
  exports: [
    LoginComponentPage
  ]
})
export class LoginComponentPageModule {}

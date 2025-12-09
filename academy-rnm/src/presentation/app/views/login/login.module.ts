import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './view/login.page';
import { TranslatePipe } from '@ngx-translate/core';
import { LoginPageViewModel } from './viewmodel/login-page.viewmodel';
import { UserDI } from 'src/data/di/user-di';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
    TranslatePipe,
    UserDI
  ],
  declarations: [LoginPage],
  providers: [LoginPageViewModel]
})
export class LoginPageModule {}

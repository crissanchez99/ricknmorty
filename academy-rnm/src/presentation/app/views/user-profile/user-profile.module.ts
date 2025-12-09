import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserProfilePageRoutingModule } from './user-profile-routing.module';

import { UserProfilePage } from './view/user-profile.page';
import { TranslatePipe } from '@ngx-translate/core';
import { UserDI } from 'src/data/di/user-di';
import { UserProfileViewModel } from './viewmodel/user-profile-page.viewmodel';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserProfilePageRoutingModule,
    TranslatePipe,
    UserDI
  ],
  declarations: [UserProfilePage],
  providers: [UserProfileViewModel]
})
export class UserProfilePageModule {}

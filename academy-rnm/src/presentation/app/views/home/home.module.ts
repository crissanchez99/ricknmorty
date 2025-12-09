import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './view/home.page';
import { TranslatePipe } from '@ngx-translate/core';
import { HomePageViewModel } from './viewmodel/home-page.viewmodel';
import { CharacterDI } from '../../../../../src/data/di/character-di';
import { LottieComponent } from 'ngx-lottie';
import { SharedComponentsModule } from '../../shared-components/shared-components-module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    TranslatePipe,
    CharacterDI,
    LottieComponent,
    SharedComponentsModule
],
  declarations: [HomePage],
  providers: [HomePageViewModel]
})
export class HomePageModule {}

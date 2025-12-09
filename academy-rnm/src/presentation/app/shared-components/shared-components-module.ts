import { NgModule } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu-languages/menu-languages.component';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
  declarations: [
    MenuComponent,
    SkeletonComponent,
    TabsComponent
  ],
  imports: [
    IonicModule,
    TranslatePipe,
  ],
  exports: [
    MenuComponent,
    SkeletonComponent,
    TabsComponent
  ],
})
export class SharedComponentsModule { }

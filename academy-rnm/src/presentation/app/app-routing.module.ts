import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './shared-components/tabs/tabs.component';

const routes: Routes = [
    {
      path: 'tabs',
      component: TabsComponent,
      children:[
        {
          path: 'home',
          loadChildren: () => import('./views/home/home.module').then( m => m.HomePageModule),
        },
        {
          path: 'user-profile',
          loadChildren: () => import('./views/user-profile/user-profile.module').then( m => m.UserProfilePageModule),
        },
        {
          path: '',
          redirectTo: 'home',
          pathMatch: 'full'
        },
      ]
    },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./views/login/login.module').then( m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

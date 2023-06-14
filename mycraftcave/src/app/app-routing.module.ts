import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { AccountSettingComponent } from './components/account-setting/account-setting.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateUsernameComponent } from './components/create-username/create-username.component';

const routes: Routes = [
  {
    path:'',
    component:HomepageComponent

  },
  {
    path:'login',
    component:LoginComponent

  },
  {
    path:'account-settings',
    component:AccountSettingComponent
  },
  {
    path:'create-username',
    component:CreateUsernameComponent
  },
  {
    path:':username',
    component:ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

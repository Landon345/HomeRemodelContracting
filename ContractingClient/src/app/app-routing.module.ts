import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ContractorsComponent} from './contractors/contractors.component';
import {MyProfileComponent} from './my-profile/my-profile.component';
import {ContractorDetailComponent} from './contractor-detail/contractor-detail.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'contractors', component: ContractorsComponent},
  {path: 'myprofile', component: MyProfileComponent},
  {path: 'contractors/:username', component: ContractorDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

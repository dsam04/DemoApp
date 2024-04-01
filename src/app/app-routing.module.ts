import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    component:HomePageComponent
  },
  {
    path:'home',
    component:HomePageComponent
  },
  {
    path:'profile',
    component:UserProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

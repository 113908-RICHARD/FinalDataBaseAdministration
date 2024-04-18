import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { authGuard } from './guards/authenticationGuard';
import { ViewProfileComponent } from './user/view-profile/view-profile.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'user/profile', component: EditProfileComponent,canActivate: [authGuard] },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
  { path: 'user/profile/view', component: ViewProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

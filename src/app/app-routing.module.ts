import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGroupComponent } from './create-group/create-group.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginComponent } from './login/login.component';
import { PointsListComponent } from './points-list/points-list.component';

const routes: Routes = [{path:"",component:CreateAccountComponent},
                        {path:"Login",component:LoginComponent},
                        {path:"addgroup",component:CreateGroupComponent},
                        {path:"pointsList",component:PointsListComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

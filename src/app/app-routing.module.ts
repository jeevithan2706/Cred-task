import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserdataComponent } from './userdata/userdata.component';
import { NewuserComponent } from './newuser/newuser.component';
import { UpdatedataComponent } from './updatedata/updatedata.component';
import { DeletedataComponent } from './deletedata/deletedata.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'userdata', pathMatch: 'full' },
      { path: 'userdata', component: UserdataComponent },
      { path: 'newuser', component: NewuserComponent },
      { path: 'updatedata', component: UpdatedataComponent },
      { path: 'deletedata', component: DeletedataComponent }
    ]
  },
  { path: '**', redirectTo: '' } // Redirect any other invalid route to the login component
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

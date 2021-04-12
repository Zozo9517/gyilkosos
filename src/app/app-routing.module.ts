import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { GyilkososComponent } from './gyilkosos/gyilkosos.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent,
  pathMatch: 'full'
},
{
  path: '',
  component: GyilkososComponent,
  canActivate: [AuthGuard]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

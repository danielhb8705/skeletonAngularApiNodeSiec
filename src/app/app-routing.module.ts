import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./_components/home/home.component";
import {LoginComponent} from "./_components/login/login.component";
import {AuthGuard} from "./_guards/auth.guard";
import {OutGuard} from "./_guards/logout.guard";
import {ProfileComponent} from "./_components/profile/profile.component";
import {RegisterComponent} from "./_components/register/register.component";
import {BalanzasComponent} from "./_components/balanzas/balanzas.component";
import {BalanzaxdptoComponent} from "./_components/balanzaxdpto/balanzaxdpto.component";
import {ErXCcXDepartamentoComponent} from "./_components/er-x-cc-x-departamento/er-x-cc-x-departamento.component";


const routes: Routes = [
  { path: '', component: HomeComponent,canActivate: [AuthGuard]},
  { path: 'perfil', component: ProfileComponent,canActivate: [ AuthGuard ]},
  { path: 'balanzas', component: BalanzasComponent, canActivate:[AuthGuard] },
  { path: 'balanzaxdpto', component: BalanzaxdptoComponent, canActivate:[AuthGuard] },
  { path: 'erxccxdpto', component: ErXCcXDepartamentoComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate:[OutGuard] },
  { path: 'register', component: RegisterComponent, canActivate:[OutGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

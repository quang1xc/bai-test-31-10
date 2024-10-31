import { Routes,RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { MerchantComponent } from './components/merchant/merchant.component';
import { OrderTableComponent } from './components/order/order.component';
import { AuthGuard } from './auth/auth';
import { TestComponent } from './components/test/test.component';
import { ParentComponent } from './components/parent/parent.component';
 const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'merchant/list', component: MerchantComponent,canActivate: [AuthGuard] },
  
  { path: 'parent', component: ParentComponent, canActivate: [AuthGuard], children: [
    { path: 'test', component: TestComponent },
    { path: '', component: OrderTableComponent } // Mặc định là OrderTableComponent
  ] },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

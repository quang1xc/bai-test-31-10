import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MerchantComponent } from './components/merchant/merchant.component';
import { OrderTableComponent } from './components/order/order.component';
import { AuthGuard } from './auth/auth';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'merchant/list', component: MerchantComponent,canActivate: [AuthGuard] },
  { path: 'merchant/list/order/:code', component: OrderTableComponent,canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/' }
];

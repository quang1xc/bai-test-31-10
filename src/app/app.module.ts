// app.module.ts hoặc module tương ứng
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { ParentComponent } from './components/parent/parent.component';
import { OrderTableComponent } from './components/order/order.component';
import { TestComponent } from './components/test/test.component'; // Đảm bảo import

@NgModule({
  declarations: [
    AppComponent,
    ParentComponent,
    OrderTableComponent,
    TestComponent // Đảm bảo rằng TestComponent đã được khai báo
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

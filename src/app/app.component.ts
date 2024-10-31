import { Component, inject, OnInit,NgModule  } from '@angular/core';
import { RouterOutlet,Router,NavigationEnd  } from '@angular/router';
import {ServerService} from './server/server.service';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  template: `
  <app-order-table (tableSelected)="onTableSelected($event)"></app-order-table>
  <app-test [selectedTable]="selectedTable"></app-test>
`,
})
export class AppComponent {
  selectedTable: number | null = null;
  private readonly serverService = inject(ServerService);
  title = 'test';
  isLoggedIn: boolean = false; 
  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkLoginStatus();
    });
    this.serverService.login('admin123', 'admin123')
      .subscribe(res => {
        console.log('res: ', res)
        if (res.code === 200 && res.data) {
          console.log('Login successful, token:', res.data.token);
          // Here you can store the token and proceed with login
        } else {
          console.error('Login failed:', res.error);
        }
      });

    this.serverService.getMerchants().subscribe(res => {
      console.log('merchants: ', res);
    });

    this.serverService.getMerchant("").subscribe(res => {
      console.log('merchant: ', res);
    })
    
  }
  ngOnInit() {
    this.checkLoginStatus();
  }
  onTableSelected(tableNo: number) {
    this.selectedTable = tableNo; // Cập nhật số bàn được chọn
  }
  
  checkLoginStatus() {
    console.log("vao ham")
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token; // Kiểm tra xem có token hay không
    console.log(this.isLoggedIn)
  }
  logout() {
    localStorage.removeItem('token')
    this.isLoggedIn = false
    this.router.navigate(['/']); 
  }
  
}

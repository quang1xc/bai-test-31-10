import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet,Router } from '@angular/router';
import {ServerService} from './server/server.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly serverService = inject(ServerService);
  title = 'test';
  isLoggedIn: boolean = false; 
  constructor(private router: Router) {
    // this.serverService.login('admin123', 'admin123')
    //   .subscribe(res => {
    //     console.log('res: ', res)
    //   });

    // this.serverService.getMerchants().subscribe(res => {
    //   console.log('merchants: ', res);
    // });

    // this.serverService.getMerchant(11).subscribe(res => {
    //   console.log('merchant: ', res);
    // })
    
  }
  ngOnInit() {
    this.checkLoginStatus();
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

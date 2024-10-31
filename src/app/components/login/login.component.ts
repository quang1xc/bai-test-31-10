import { Component } from '@angular/core';
import { ServerService } from '../../server/server.service';
import { Router } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule,FormsModule],
  
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private serverService: ServerService,
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle('Login Page');
  }

  login() {
    this.serverService.login(this.username, this.password).subscribe(res => {
      if (res.code === 200 && res.data) {
        console.log('Login successful:', res);
        localStorage.setItem('token', res.data.token); 
        this.router.navigate(['/merchant/list']); 
      } else {
        if (res.error === "USER_NOT_FOUND") {
          this.errorMessage = "Tên đăng nhập không hợp lệ";
        }
        else if (res.error === "PASSWORD_NOT_CORRECT") {
          this.errorMessage = "Sai mật khẩu";
        } else {
          this.errorMessage = "Thông tin không chính xác";
        }
        
      }
    });
  }
  closeModal() {
    this.errorMessage = '';
  }
  
}
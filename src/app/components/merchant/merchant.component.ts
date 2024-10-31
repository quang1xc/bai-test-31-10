import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ServerService } from '../../server/server.service';
import { IMerchant } from '../../models/merchant.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class MerchantComponent implements OnInit {
    
  merchants: IMerchant[] = [];
 

  constructor(private serverService: ServerService,
                 private router : Router,
                 private title : Title) {}

  ngOnInit() {
    this.serverService.getMerchants().subscribe(res => {
      if (res.code === 200) {
        this.merchants = res.data;
      } else {
        console.error(res.error);
      }
    });
    this.title.setTitle('SubMerchant Page');
  }

  viewDetails(merchantCode: string) {
    
    
    this.router.navigate(['/merchant/list/order', merchantCode]);
}
}
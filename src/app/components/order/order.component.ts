import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { ServerService } from '../../server/server.service';
import { IMerchant } from '../../models/merchant.interface';
import { CommonModule } from '@angular/common'; 
import { Title } from '@angular/platform-browser';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  standalone: true, 
  imports: [CommonModule],
  
})

export class OrderTableComponent implements OnInit {
    merchantCode: string;   
  merchant: IMerchant | null = null;
  private subscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, 
              private serverService: ServerService,
              private title : Title) {
    this.merchantCode = this.route.snapshot.paramMap.get('code') || '';
  }

  ngOnInit() {
    this.title.setTitle('Tables System Page');
    this.loadMerchantData(); 
    const source = interval(30000); 
    this.subscription = source.subscribe(() => {
      this.loadMerchantData();
    });
    
  }

  loadMerchantData() {
    console.log("vao ham")
    this.serverService.getMerchant(this.merchantCode).subscribe(res => {
      if (res.code === 200 && res.data) {
        this.merchant = res.data
        
      } else {
        console.error(res);
      }
    });
  }
  ngOnDestroy() {   
    this.subscription.unsubscribe();
  }
}

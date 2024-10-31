import { Component, OnInit,ChangeDetectorRef , Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { ServerService } from '../../server/server.service';
import { IMerchant } from '../../models/merchant.interface';
import { CommonModule } from '@angular/common'; 
import { Title } from '@angular/platform-browser';
import { interval, Subscription } from 'rxjs';
import { ETableStatus } from '../../models/merchant.interface';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  standalone: true, 
  imports: [CommonModule],
  animations: [
    trigger('tableStatusChange', [
      state('EMPTY', style({ backgroundColor: 'white' })),
      state('USING', style({ backgroundColor: 'lightgreen' })),
      state('ORDER', style({ backgroundColor: 'yellow' })),
      state('FINISH', style({ backgroundColor: 'lightcoral' })),
      transition('* => *', [
        animate('1s ease-in-out')
      ])
    ])
  ]
  
})

export class OrderTableComponent implements OnInit {
  @Output() tableSelected = new EventEmitter<number>();

    merchantCode: string;   
  merchant: IMerchant | null = null;
  private subscription: Subscription = new Subscription();
  statusOptions: ETableStatus[] = [
    ETableStatus.EMPTY,
    ETableStatus.NEW,
    ETableStatus.USING,
    ETableStatus.FINISH,
  ];
    originalStatus: { [key: number]: string } = {};
    isFirstLoad: boolean = true;

  constructor(private route: ActivatedRoute, 
              private serverService: ServerService,
              private title : Title,
              private cdr: ChangeDetectorRef) {
    this.merchantCode = this.route.snapshot.paramMap.get('code') || '';
  }

  ngOnInit() {
    this.title.setTitle('Tables System Page');
    this.loadMerchantData(); 
    const source = interval(10000); 
    this.subscription = source.subscribe(() => {
      this.updateTableStatusesRandomly();
    });
    
  }

  loadMerchantData() {
    console.log("vao ham")
    this.serverService.getMerchant(this.merchantCode).subscribe(res => {
      if (res.code === 200 && res.data && res.data.tables) {
        this.merchant = res.data;
        this.cdr.markForCheck(); // Đánh dấu để Angular cập nhật giao diện
      } else {
        console.error(res);
      }
    });
  }

  updateTableStatusesRandomly() {
    if (this.merchant && this.merchant.tables) {
      this.merchant.tables.forEach(table => {
        
        const randomStatus = this.statusOptions[Math.floor(Math.random() * this.statusOptions.length)];
        table.status = randomStatus; 
      });
      this.cdr.markForCheck(); // Đánh dấu để Angular cập nhật giao diện
    }
  }

  trackByTableNo(index: number, table: any): number {
    return table.no; // Sử dụng số bàn làm ID
  }

  ngOnDestroy() {   
    this.subscription.unsubscribe();
  }
  selectTable(tableNo: number) {
    console.log("da click")
    this.tableSelected.emit(tableNo);
  }
}

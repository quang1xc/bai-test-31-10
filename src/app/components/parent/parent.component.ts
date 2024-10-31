import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {
  selectedTableNo: number | null = null; // Biến để lưu số bàn được chọn
  constructor(private router: Router) {}
  onTableSelect(tableNo: number): void {
    this.selectedTableNo = tableNo;
    console.log('Selected Table No:', tableNo); // Log số bàn đã chọn
    this.router.navigate(['/test']); // Chuyển hướng đến TestComponent
  }
}
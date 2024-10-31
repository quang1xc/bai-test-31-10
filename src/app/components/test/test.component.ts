import { Component, OnInit, Input } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div>
    <h2>Test Component</h2>
    <p>Bàn được chọn: {{ selectedTable }}</p>
  </div>
`,
})
export class TestComponent implements OnInit {
    @Input() selectedTable: number | null = null;
 

  constructor() {}

  ngOnInit() {
    
  }

 
}
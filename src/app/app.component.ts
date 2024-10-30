import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ServerService} from './server/server.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly serverService = inject(ServerService);
  title = 'test';

  constructor() {
    this.serverService.login('admin123', 'admin123')
      .subscribe(res => {
        console.log('res: ', res)
      });

    this.serverService.getMerchants().subscribe(res => {
      console.log('merchants: ', res);
    });

    this.serverService.getMerchant(11).subscribe(res => {
      console.log('merchant: ', res);
    })
  }
}

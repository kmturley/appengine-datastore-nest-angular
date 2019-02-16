import { Component, OnInit } from '@angular/core';

import { ApiService } from './shared/api.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  items: Array<any>;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.api.get(`${environment.apiUrl}/items`, 'items').subscribe((data: Array<any>) => {
      this.items = data[0];
    });
  }

  add() {
    this.api.post(`${environment.apiUrl}/items`, {}).subscribe(() => {
      this.load();
    });
  }

}

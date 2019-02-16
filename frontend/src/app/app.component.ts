import { Component, OnInit } from '@angular/core';

import { ApiService } from './shared/api.service';

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
    console.log('AppComponent', this);
    this.load();
  }

  load() {
    console.log('load');
    this.api.get('items').subscribe((data: Array<any>) => {
      console.log('load.success', data[0]);
      this.items = data[0];
    });
  }

  add() {
    console.log('add');
    this.api.post('items').subscribe(() => {
      console.log('add.success');
      this.load();
    });
  }

}

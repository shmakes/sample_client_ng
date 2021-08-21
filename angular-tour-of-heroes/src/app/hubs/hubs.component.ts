import { Component, OnInit } from '@angular/core';

import { Hub } from '../api.generated.clients';
import { Flight } from '../api.generated.clients';
import { HubService } from '../hub.service';

@Component({
  selector: 'app-Hubs',
  templateUrl: './Hubs.component.html',
  styleUrls: ['./Hubs.component.css']
})
export class HubsComponent implements OnInit {
  Hubs: Hub[] = [];

  constructor(private HubService: HubService) { }

  ngOnInit() {
    this.getHubs();
  }

  getHubs(): void {
    this.HubService.getHubs()
    .subscribe(Hubs => this.Hubs = Hubs);
  }
}

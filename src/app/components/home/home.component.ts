import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { UiBaseClass } from '../base';
import { TeamListComponent } from '../team-list/team-list.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTabsModule, TeamListComponent]
})
export class HomeComponent extends UiBaseClass implements OnInit {
  selectedTab = 'Overview';
  tabs = ['Teams', 'Free Agents']

  constructor() {
    super()
  }


  ngOnInit(): void {
    this.initData();
  }

  async initData() {
    if (!this.ts.loaded()) await this.ts.loadTeams(this.api_key)
    if (!this.ps.loaded()) await this.ps.loadPlayers(this.api_key)

    console.log(this.teams)
    console.log(this.players)
    console.log(this.players.filter(p => p.isFreeAgent !== "True" && p.team === "BUF"))
  }

}

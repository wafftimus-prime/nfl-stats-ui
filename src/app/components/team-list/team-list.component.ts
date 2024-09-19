import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UiBaseClass } from '../base';
@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class TeamListComponent extends UiBaseClass {
  headers = ["Team", "Conference", "Division", "Record"];

  constructor() {
    super()
  }

}

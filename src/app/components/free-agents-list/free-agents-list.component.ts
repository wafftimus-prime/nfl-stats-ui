import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UiBaseClass } from '../base';
@Component({
  selector: 'app-free-agents-list',
  templateUrl: './free-agents-list.component.html',
  styleUrls: ['./free-agents-list.component.scss'],
  standalone: true,
  imports: [CommonModule, ScrollingModule]
})
export class FreeAgentsListComponent extends UiBaseClass {
  headers = ["Name", "Position", "Last Team", "College-Exp"];

  constructor() {
    super()
  }

}

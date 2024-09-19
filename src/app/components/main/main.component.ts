import { NgIf } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/** This is the entry point / wrapper for the validated users of the API */
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true,
  imports: [NgIf, RouterOutlet],
  encapsulation: ViewEncapsulation.None,
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { BackgroundBlurComponent } from './components/bg-blur.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    BackgroundBlurComponent
  ]
})
export class LoginComponent implements OnInit {
  open = false
  state = false

  constructor() { }

  ngOnInit() {
  }

}

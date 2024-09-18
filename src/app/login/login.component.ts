import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BackgroundBlurComponent } from './components/bg-blur.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    BackgroundBlurComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class LoginComponent {
  api_key!: string;
  as = inject(AuthService)
  router = inject(Router)



  submitAPIKey() {
    this.as.signIn(this.api_key).subscribe(() => {
      console.log("Signed IN")
      this.api_key = ''
      this.router.navigate(['/home'])
    })
  }


}

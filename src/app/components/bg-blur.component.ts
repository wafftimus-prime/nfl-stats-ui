import { Component } from '@angular/core';

@Component({
  selector: 'app-bg-blur',
  template: `
    <div
    class="z-10 absolute inset-0 blur-xl max-h-[580px] flex-auto"
    style="
      background: linear-gradient(
        143.6deg,
        rgba(192, 132, 252, 0) 20.79%,
        rgba(232, 121, 249, 0.26) 40.92%,
        rgba(204, 171, 238, 0) 70.35%
      );
    "></div>
  `,
  standalone: true
})
export class BackgroundBlurComponent {
}

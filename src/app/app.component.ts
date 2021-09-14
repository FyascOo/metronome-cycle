import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ion-app>
      <app-main>
        <ion-router-outlet></ion-router-outlet>
      </app-main>
    </ion-app>
  `,
})
export class AppComponent {
  constructor() {}
}

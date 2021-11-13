import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

@Component({
  selector: 'app-start',
  template: `
    <ion-button color="primary" (click)="eventStart.emit()">Start</ion-button>
  `,
})
export class StartComponent {
  @Output() eventStart = new EventEmitter<boolean>();
  constructor() {
  }

}

@NgModule({
  declarations: [StartComponent],
  exports: [StartComponent],
  imports: [CommonModule, IonicModule],
})
export class StartModule {
}

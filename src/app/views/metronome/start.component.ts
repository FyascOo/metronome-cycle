import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-start',
  template: `
    <ion-button color="primary" (click)="eventStart.emit()">{{
      start ? 'Stop' : 'Start'
    }}</ion-button>
  `,
})
export class StartComponent {
  @Input() start: boolean;
  @Output() eventStart = new EventEmitter<boolean>();
  constructor() {}
}

@NgModule({
  declarations: [StartComponent],
  exports: [StartComponent],
  imports: [CommonModule, IonicModule],
})
export class StartModule {}

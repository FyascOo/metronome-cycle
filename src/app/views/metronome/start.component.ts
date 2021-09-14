import {Component, OnInit} from '@angular/core';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

@Component({
  selector: 'app-start',
  template: `
    <ion-button color="primary">Primary</ion-button>
  `,
})
export class StartComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}

@NgModule({
  declarations: [StartComponent],
  exports: [StartComponent],
  imports: [CommonModule, IonicModule],
})
export class StartModule {
}

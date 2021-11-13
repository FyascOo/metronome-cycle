import {ChangeDetectionStrategy, Component, EventEmitter, NgModule, OnInit, Output,} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-bpm',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <ion-item>
    <ion-label>{{bpmFC.value}}</ion-label>
    <ion-range [formControl]="bpmFC" min="0" max="260"></ion-range>
  </ion-item>
  `,
})
export class BPMComponent {
  @Output() emitBPM: Observable<number>;
  bpmFC = new FormControl(120);
  constructor() {
    this.emitBPM = this.bpmFC.valueChanges;
  }
}

@NgModule({
  exports: [BPMComponent],
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  declarations: [BPMComponent],
})
export class BPMModule {
}

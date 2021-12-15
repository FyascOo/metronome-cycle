import { Observable } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Component, OnInit, Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-mesure',
  template: ` <ion-item>
    <ion-label>Mesure</ion-label>
    <ion-select [formControl]="mesureFC">
      <ion-select-option *ngFor="let mesure of mesures" [value]="mesure">{{
        mesure
      }}</ion-select-option>
    </ion-select>
  </ion-item>`,
})
export class MesureComponent {
  @Output() emitMesure: Observable<number>;
  mesures = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  mesureFC = new FormControl(4);
  constructor() {
    this.emitMesure = this.mesureFC.valueChanges;
  }
}
@NgModule({
  declarations: [MesureComponent],
  exports: [MesureComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
})
export class MesureModule {}

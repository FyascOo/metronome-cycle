import { MesureModule } from './mesure.component';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MetronomeModule } from './metronome.component';
import { StartModule } from './start.component';
import { BPMModule } from './bpm.component';
import { Howl } from 'howler';
import {
  BehaviorSubject,
  combineLatest,
  interval,
  Subject,
  Subscription,
} from 'rxjs';
import { bpmToMillisecond, msToInterval } from 'src/app/shared/utils';

@Component({
  selector: 'app-metronome-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <app-start
              [start]="start"
              (eventStart)="start = !start"
            ></app-start>
            <app-bpm (emitBPM)="bpm$.next($event)"></app-bpm>
            <app-mesure (emitMesure)="mesure$.next($event)"></app-mesure>
          </ion-col>
        </ion-row>
        <ion-row class="ion-justify-content-center">
          <app-metronome
            [start]="start"
            [bpm]="bpm$ | async"
            [mesure]="mesure$ | async"
            (emitNbRotate)="nbRotate$.next($event)"
          ></app-metronome>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
})
export class MetronomePage {
  start = false;
  bpm$ = new BehaviorSubject<number>(60);
  nbRotate$ = new Subject<number>();
  mesure$ = new BehaviorSubject<number>(4);
  beep = new Howl({
    src: ['../assets/son/bip.flac'],
  });

  constructor() {
    combineLatest([this.nbRotate$, this.mesure$, this.bpm$]).subscribe(
      ([nbRotate, mesure, bpm]) => {
        const tempo = Array(mesure)
          .fill(0)
          .map((v, i) => {
            const speed = (i + 1) * ((60 / bpm) * 60);
            return Math.round(speed);
          });
        if (tempo.includes(nbRotate)) {
          this._playBip();
        }
      }
    );
  }

  private _playBip() {
    this.beep.play();
  }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MetronomeModule,
    StartModule,
    BPMModule,
    MesureModule,
  ],
  declarations: [MetronomePage],
})
export class MetronomePageModule {}

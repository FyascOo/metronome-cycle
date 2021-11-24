import { MesureModule } from './mesure.component';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MetronomeModule } from './metronome.component';
import { StartModule } from './start.component';
import { BPMModule } from './bpm.component';
import { Howl } from 'howler';
import { BehaviorSubject, interval, Subject, Subscription } from 'rxjs';
import { bpmToMillisecond, msToInterval } from 'src/app/shared/utils';

@Component({
  selector: 'app-metronome-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <app-start [start]="start" (eventStart)="onStart()"></app-start>
            <app-bpm (emitBPM)="updateBPM($event)"></app-bpm>
            <app-mesure (emitMesure)="mesure$.next($event)"></app-mesure>
          </ion-col>
        </ion-row>
        <ion-row class="ion-justify-content-center">
          <ion-col size="3">
            <app-metronome
              [start]="start"
              [bpm]="bpm"
              [mesure]="mesure$ | async"
              (emitNbRotate)="nbRotate$.next($event)"
            ></app-metronome>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
})
export class MetronomePage {
  start = false;
  bpm = 60;
  nbRotate$ = new Subject<number>();
  mesure$ = new BehaviorSubject<number>(4);
  beep = new Howl({
    src: ['../assets/son/bip.flac'],
  });
  intervalSub: Subscription;

  constructor() {
    this.nbRotate$.subscribe((nbRotate) => {
      if (
        nbRotate === 0 ||
        nbRotate === 60 ||
        nbRotate === 120 ||
        nbRotate === 180 ||
        nbRotate === 240
      ) {
        this._playBip();
      }
    });
  }

  onStart() {
    this.start = !this.start;
    if (this.start) {
      this._playBip();
    }
  }

  updateBPM(bpm: number) {
    this.bpm = bpm;
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

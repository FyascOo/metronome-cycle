import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MetronomeModule } from './metronome.component';
import { StartModule } from './start.component';
import { BPMModule } from './bpm.component';
import { Howl } from 'howler';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-metronome-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <app-start (eventStart)="onStart()"></app-start>
            <app-bpm (emitBPM)="updateBPM($event)"></app-bpm>
          </ion-col>
        </ion-row>
        <ion-row class="ion-justify-content-center">
          <ion-col size="3">
            <app-metronome [start]="start"></app-metronome>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
})
export class MetronomePage {
  start = false;
  bpm = 1000;
  beep = new Howl({
    src: ['../assets/son/bip.flac'],
  });
  intervalSub: Subscription;

  constructor() {}

  onStart() {
    this.start = !this.start;
    if (this.start) {
      this._playBip();
    } else {
      this._stopBip();
    }
  }

  updateBPM(bpm: number) {
    this.bpm = bpm;
  }

  private _playBip() {
    this.intervalSub = interval(this.bpm).subscribe(() => this.beep.play());
  }

  private _stopBip() {
    this.intervalSub.unsubscribe();
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
  ],
  declarations: [MetronomePage],
})
export class MetronomePageModule {}

import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgModule,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
  ViewRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-metronome',
  template: `
    <svg
      width="300"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="metronome">
        <rect width="200" height="200" fill="white" />
        <g id="circle" filter="url(#filter0_d)">
          <circle cx="102" cy="102" r="90" fill="white" />
          <circle cx="102" cy="102" r="89.5" stroke="url(#paint0_linear)" />
        </g>
        <ellipse
          #pointer
          id="pointer"
          cx="101.5"
          cy="12.5"
          rx="11.5"
          ry="10.5"
          fill="url(#paint1_radial)"
        />
        <rect
          *ngFor="let nb of mesures"
          #mesure
          id="mesure"
          x="101"
          width="1"
          height="25"
          rx="0.5"
          fill="black"
        />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="8"
          y="12"
          width="188"
          height="188"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear"
          x1="156.5"
          y1="30.5"
          x2="41"
          y2="171.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#37D500" stop-opacity="0.69" />
          <stop offset="1" stop-color="#BE0000" stop-opacity="0.74" />
        </linearGradient>
        <radialGradient
          id="paint1_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(101.5 12.5) rotate(90) scale(10.5 11.5)"
        >
          <stop stop-color="#5BEF00" stop-opacity="0.15" />
          <stop offset="1" stop-color="#00FF38" stop-opacity="0.71" />
        </radialGradient>
      </defs>
    </svg>
  `,
})
export class MetronomeComponent implements OnChanges, AfterViewInit {
  @Input() start: boolean;
  @Input() bpm: number;
  @Input() mesure: number;
  @Output() emitNbRotate = new BehaviorSubject<number>(0);
  @ViewChild('pointer') pointer: ElementRef;
  @ViewChildren('mesure') barMesures: QueryList<ElementRef>;
  nbRotate = 0;
  rotate = 0;
  mesures: number[];

  constructor() {}

  ngOnChanges() {
    this._initiateLoop();
    if (this.mesure) {
      this.mesures = Array(this.mesure);
    }
  }

  ngAfterViewInit() {
    this._initMesure();
    this._setMesure();
  }

  rotation() {
    this.nbRotate++;
    this.rotate = this.nbRotate * this._bpmPerCycle();
    this.emitNbRotate.next(this.nbRotate);
    this._refreshValue();
    this._affectStyle();
    this._loop();
  }

  private _initMesure() {
    this.barMesures.forEach((v, i) => {
      if (i !== 0) {
        const deg = (360 / this.barMesures.length) * i;
        v.nativeElement.style.transformOrigin = 'center';
        v.nativeElement.style.transform = `rotateZ(${deg}deg)`;
      }
    });
  }

  private _setMesure() {
    this.barMesures.changes.subscribe((bar) => {
      bar.forEach((v, i) => {
        if (i !== 0) {
          const deg = (360 / this.barMesures.length) * i;
          v.nativeElement.style.transformOrigin = 'center';
          v.nativeElement.style.transform = `rotateZ(${deg}deg)`;
        }
      });
    });
  }

  private _initiateLoop() {
    if (this.start) {
      window.requestAnimationFrame(() => this.rotation());
    }
  }

  private _refreshValue() {
    if (this.rotate > 360) {
      this.nbRotate = 0;
      this.rotate = 0;
    }
  }
  private _loop() {
    if (this.start) {
      requestAnimationFrame(() => this.rotation());
    }
  }
  private _affectStyle() {
    this.pointer.nativeElement.style.transformOrigin = 'center';
    this.pointer.nativeElement.style.transform = `rotateZ(${this.rotate}deg)`;
  }

  private _bpmPerCycle() {
    return this.bpm / 10 / this.mesure;
  }
}

@NgModule({
  declarations: [MetronomeComponent],
  exports: [MetronomeComponent],
  imports: [CommonModule],
})
export class MetronomeModule {}

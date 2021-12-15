import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-main',
  template:` <ng-content></ng-content> `,
})
export class MainComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
@NgModule({
  declarations: [MainComponent],
  exports: [MainComponent],
  imports: [CommonModule],
})
export class MainModule {}

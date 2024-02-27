import { Injectable } from '@angular/core';
import { NgProgressRef } from 'ngx-progressbar';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  progressRef: NgProgressRef;
  defaultColor = '#FF1B1B';//'#FFFFFF';
  successColor = 'FF1B1B';//'#FFFFF';
  errorColor = '#EF0000';
  currentColor = this.defaultColor;
  constructor() { }
  
  startLoading() {
    this.currentColor = this.defaultColor;
    this.progressRef.start();
  }

  completeLoading() {
    this.progressRef.complete();
  }

  setSuccessColor() {
    this.currentColor = this.successColor;
  }

  setErrorColor() {
    this.currentColor = this.errorColor;
  }
  /*changeProgressColor() {
    this.progressRef.setConfig({ color: 'green' });
  }*/
}

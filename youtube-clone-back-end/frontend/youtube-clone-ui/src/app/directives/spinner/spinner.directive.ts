import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { style } from '@angular/animations';

@Directive({
  selector: '[appSpinner]',
  standalone: true,
})
export class SpinnerDirective {
  @Input() showSpinner: boolean = false;
  constructor(private el: ElementRef, private renderer: Renderer2) {
    
  }

  private addStyles(): void {
    const styles = `
    .spinner {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 4px solid var(--yt-color-blue);
      border-top: 4px solid #f3f3f3;
      animation: spin .8s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    `;//#3498db
    const styleElement = this.renderer.createElement('style');
    styleElement.type = 'text/css';
    styleElement.appendChild(this.renderer.createText(styles));

    this.renderer.appendChild(this.el.nativeElement, styleElement);
  }

  ngOnInit() {
    this.addStyles();
    if (this.showSpinner) {
      this.renderer.addClass(this.el.nativeElement, 'spinner');
    }
  }

  /*const styleElement = this.renderer.createElement('style');
  this.renderer.appendChild(styleElement, this.renderer.createText(styles));
  this.renderer.appendChild(document.head, styleElement);*/
}

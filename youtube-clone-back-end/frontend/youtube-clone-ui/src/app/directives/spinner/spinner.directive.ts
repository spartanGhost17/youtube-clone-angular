import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSpinner]',
  standalone: true
})
export class SpinnerDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { 
    this.addStyles();
  }

  private addStyles(): void {
    const styles = `
    .spinner {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #3498db;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    `;
    const styleElement = this.renderer.createElement('style');
    this.renderer.appendChild(styleElement, this.renderer.createText(styles));
    this.renderer.appendChild(document.head, styleElement);
  }

  ngOnInit() {
    this.el.nativeElement.classList.add('spinner');
  }

}

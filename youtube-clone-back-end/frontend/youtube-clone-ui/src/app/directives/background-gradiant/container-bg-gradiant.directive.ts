import { AfterViewInit, Directive, ElementRef, Input, SimpleChanges } from '@angular/core';
//import ColorThief from 'colorthief';
import Vibrant from 'node-vibrant';
@Directive({
  selector: '[appContainerBgGradiant]'
})
export class ContainerBgGradiantDirective implements AfterViewInit {
  @Input() thumbnailURL: string;
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.applyGradiant();
  }

  applyGradiant() {
    let src = this.thumbnailURL;
    Vibrant.from(src).getPalette((_err: any, palette: any) => {
      if(palette) {
        console.log("palette ", palette);
        const primaryColor = palette.Vibrant!.hex;
        const secondaryColor = palette.Muted!.hex;
        const gradient = `linear-gradient(to bottom, ${primaryColor}, rgba(0, 0, 0, 0.800)), linear-gradient(to bottom, rgba(0, 0, 0, 1.000), ${secondaryColor})`;
        this.el.nativeElement.style.backgroundImage = gradient;
        if ('backdropFilter' in document.documentElement.style) { //not all browsers may support backdrop filter
          this.el.nativeElement.style.backdropFilter = 'blur(10px)';
        }

      }
      
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.thumbnailURL) {
      this.applyGradiant();
    }
  }

}

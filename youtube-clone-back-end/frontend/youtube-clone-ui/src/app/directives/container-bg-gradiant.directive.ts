import { AfterViewInit, Directive, ElementRef } from '@angular/core';
//import ColorThief from 'colorthief';
import Vibrant from 'node-vibrant';// stable version node-vibrant@3.1.6
@Directive({
  selector: '[appContainerBgGradiant]'
})
export class ContainerBgGradiantDirective implements AfterViewInit {

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const thumbnail = this.el.nativeElement.querySelector('.thumbnail');
    
    const img = thumbnail.querySelector('img');
    const container = this.el.nativeElement;
    console.log("thumbnail",thumbnail);
    console.log("image ",img.src);
    Vibrant.from(img.src).getPalette((err, palette) => {
      if(palette) {
        console.log("palette ", palette);
        const primaryColor = palette.Vibrant!.hex;
        const secondaryColor = palette.Muted!.hex;
        console.log("primary color ", primaryColor);
        console.log("secondary color ", secondaryColor);
  
        //const gradient = `linear-gradient(to bottom, ${primaryColor}, ${secondaryColor})`;
        //const gradient = `linear-gradient(to bottom, ${primaryColor}, rgba(0, 0, 0, 0)), linear-gradient(to bottom, rgba(0, 0, 0, 0.3), ${secondaryColor})`;
        const gradient = `linear-gradient(to bottom, ${primaryColor}, rgba(0, 0, 0, 0.800)), linear-gradient(to bottom, rgba(0, 0, 0, 1.000), ${secondaryColor})`;

        console.log("gradient ", gradient);
        this.el.nativeElement.style.backgroundImage = gradient;
        //this.el.nativeElement.style.backgroundImage = img.src;
        //this.el.nativeElement.style.backgroundRepeat = 'no-repeat';
        //this.el.nativeElement.style.backgroundSize = 'cover';
        //this.el.nativeElement.style.backgroundAttachement = 'fixed';
        //this.el.nativeElement.style.background = gradient;
        if ('backdropFilter' in document.documentElement.style) { //not all browsers may support backdrop filter
          this.el.nativeElement.style.backdropFilter = 'blur(10px)';
        }

      }
      
    });
  }

}

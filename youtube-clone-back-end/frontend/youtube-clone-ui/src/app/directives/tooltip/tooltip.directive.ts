import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input('appTooltip') content: string = '';
  private tooltip: HTMLDivElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.addStyles();
  }

  private addStyles(): void {
    const styles = `
      .tooltip {
        position: absolute;
        background-color: #333;
        color: #fff;
        padding: 8px;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        height: fit-content;
      }
    `;

    const styleElement = this.renderer.createElement('style');
    this.renderer.appendChild(styleElement, this.renderer.createText(styles));
    this.renderer.appendChild(document.head, styleElement);
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.showTooltip();
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.hideTooltip();
  }

  private showTooltip(): void {
    this.tooltip = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltip, 'tooltip');
    this.renderer.appendChild(this.tooltip, this.renderer.createText(this.content));

    const elRect = this.el.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltip!.getBoundingClientRect();

    const top = elRect.top + tooltipRect.height + 45;
    //const left = elRect.left + elRect.width / 2 - tooltipRect.width / 2;
    const left = elRect.left - tooltipRect.width / 2;

    this.renderer.setStyle(this.tooltip, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltip, 'left', `${left}px`);

    this.renderer.appendChild(document.body, this.tooltip);
  }

  private hideTooltip(): void {
    if (this.tooltip) {
      this.renderer.removeChild(document.body, this.tooltip);
      this.tooltip = null;
    }
  }
}

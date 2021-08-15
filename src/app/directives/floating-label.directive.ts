import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

const _FULL_LABEL = 'full-label';

@Directive({
  selector: '[appFloatingLabel]',
})
export class FloatingLabelDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  private float(focused: boolean) {
    const value: string = this.el.nativeElement.value;
    const label: HTMLLabelElement = this.el.nativeElement.nextElementSibling;

    if (focused) {
      if (value === '') {
        this.renderer.addClass(label, _FULL_LABEL);
      }
    } else {
      if (value === '') {
        this.renderer.removeClass(label, _FULL_LABEL);
      }
    }
  }

  @HostListener('focus') onInputFocus() {
    this.float(true);
  }

  @HostListener('blur') onInputBlur() {
    this.float(false);
  }
}

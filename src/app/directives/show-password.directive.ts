import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

const _IMG_URL = {
  show: '../../assets/images/show-password.svg',
  unShow: '../../assets/images/unshow-password.svg',
};

@Directive({
  selector: '[appShowPassword]',
})
export class ShowPasswordDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') onInputClick() {
    this.showPassword();
  }

  showPassword() {
    const currentElement = this.el.nativeElement;
    const input = currentElement.previousElementSibling.previousElementSibling;
    const type = input.type;

    if (type === 'password') {
      this.renderer.setAttribute(input, 'type', 'text');
      currentElement.src = _IMG_URL.unShow;
    } else {
      this.renderer.setAttribute(input, 'type', 'password');
      currentElement.src = _IMG_URL.show;
    }
  }
}

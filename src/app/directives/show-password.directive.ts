import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
    selector: '[appShowPassword]',
})
export class ShowPasswordDirective {
    constructor(private el: ElementRef, private renderer: Renderer2) {}

    @HostListener('click') onInputClick() {
        this.togglePasswordVisibility();
    }

    togglePasswordVisibility() {
        const currentElement = this.el.nativeElement;
        const input = currentElement.previousElementSibling.previousElementSibling;
        const type = input.type;

        if (type === 'password') {
            this.renderer.setAttribute(input, 'type', 'text');
            currentElement.src = '../../assets/images/hide-password.svg';
        } else {
            this.renderer.setAttribute(input, 'type', 'password');
            currentElement.src = '../../assets/images/show-password.svg';
        }
    }
}

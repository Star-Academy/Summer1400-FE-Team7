import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

const floatLabelClass = 'float-label';

@Directive({
    selector: '[appFloatingLabel]',
})
export class FloatingLabelDirective {
    constructor(private el: ElementRef, private renderer: Renderer2) {
    }

    private float(focused: boolean) {
        const value: string = this.el.nativeElement.value;
        const label: HTMLLabelElement = this.el.nativeElement.nextElementSibling;

        if (value === '') {
            focused ?
                this.renderer.addClass(label, floatLabelClass)
                : this.renderer.removeClass(label, floatLabelClass);


        }

    }

    @HostListener('focus') onInputFocus() {
        this.float(true);
    }

    @HostListener('blur') onInputBlur() {
        this.float(false);
    }
}

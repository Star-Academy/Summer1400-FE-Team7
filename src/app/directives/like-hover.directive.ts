import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
    selector: '[appLikeHover]',
})
export class LikeHoverDirective {
    constructor(private el: ElementRef, private renderer: Renderer2) {}
    @HostListener('mouseover') onMouseover() {
        this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1.2)');
    }
    @HostListener('mouseout') onMouseout() {
        this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1)');
    }
}

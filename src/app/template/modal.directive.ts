import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appModal]'
})
export class ModalDirective {
  @Input() set appModal(message: string) {
    if (message) {
      this.showModal(message);
    } else {
      this.hideModal();
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  private showModal(message: string) {
    this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
    this.el.nativeElement.querySelector('.modal-message').innerText = message;
  }

  private hideModal() {
    this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
  }
}
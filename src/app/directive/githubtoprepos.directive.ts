import {Directive, ElementRef, HostListener, Input} from "@angular/core";
@Directive({
  selector: '[onlyNumber]'
})
export class OnlyNumberDirective {

  regexStr = '^[0-9]*$';
  constructor(private el: ElementRef) { }

  @Input() onlyNumber: boolean;

  @HostListener('keydown', ['$event']) onKeyDown(event:KeyboardEvent) {
    let e = event;
    if (this.onlyNumber) {
      if([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
        (e.keyCode >= 35 && e.keyCode <= 39))
        return;
      let ch = String.fromCharCode(e.keyCode);
      let regEx =  new RegExp(this.regexStr);
      if(regEx.test(ch))
        return;
      else
        e.preventDefault();
    }
  }
}

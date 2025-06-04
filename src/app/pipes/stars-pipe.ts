import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({
  name: 'stars'
})
export class StarsPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: number): SafeHtml  {
   var sa= ` <div class="text-warning">
    <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
      <small class="text-muted ms-1">(4.8)</small>
      </div>`;

    let stars = '';
    for (let i = 1; i <= 5; i++) {
      if (value >= i) {
        stars += '<i class="fas fa-star"></i>';
      } else if (value >= i - 0.5) {
        stars += '<i class="fas fa-star-half-alt"></i>';
      } else {
        stars += '<i class="far fa-star"></i>';
      }
    }
    const html = `<div class="text-warning">${stars}<small class="text-muted ms-1">(${value})</small></div>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}

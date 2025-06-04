import {Component, Input} from '@angular/core';
import {ProductModel} from '../../model/ProductModel';
import {CommonModule} from '@angular/common';
import {StarsPipe} from '../../pipes/stars-pipe';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule,StarsPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {
  @Input() product!: ProductModel;

  getOriginalPrice(price?: number, discount?: number): string {
    if (!price || !discount) return '';
    const original = price / (1 - discount / 100);
    return original.toFixed(2);
  }
}

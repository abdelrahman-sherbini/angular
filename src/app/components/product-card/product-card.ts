import {Component, Input} from '@angular/core';
import {ProductModel} from '../../model/ProductModel';
import {CommonModule} from '@angular/common';
import {StarsPipe} from '../../pipes/stars-pipe';
import {RouterLink} from '@angular/router';
import {CartService} from '../../services/cart';
import {ProductDetailsComponent} from '../../product/product-details/product-details.component';
import {ProductDetailModel} from '../../model/ProductDetailModel';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, StarsPipe, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {
  quantity: number = 1;
  constructor(private cartService: CartService) {}
  @Input() product!: ProductDetailModel;

  getOriginalPrice(price?: number, discount?: number): string {
    if (!price || !discount) return '';
    const original = price / (1 - discount / 100);
    return original.toFixed(2);
  }

  addToCart() {
    this.cartService.addToCart(this.product, this.quantity);
  }
  increaseQuantity() {
    if (this.product && this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

}

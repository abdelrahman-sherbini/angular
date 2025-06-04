import {Component, OnInit} from '@angular/core';
import {ProductModel} from '../../model/ProductModel';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../services/product';
import {CartService} from '../../services/cart';
import {ProductDetailModel} from '../../model/ProductDetailModel';
import {FormsModule} from '@angular/forms';
import {CommonModule, DatePipe} from '@angular/common';
import {StarsPipe} from '../../pipes/stars-pipe';

@Component({
  selector: 'app-product-details',
  imports: [
    CommonModule,
    FormsModule,
    DatePipe,
    StarsPipe
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product: ProductDetailModel = new ProductDetailModel();
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: Product,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('productId');
    if (productId) {
      this.loadProduct(parseInt(productId));
    }else{
      this.router.navigate(['/products']);
    }
  }

  loadProduct(id: number) {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.router.navigate(['/products']);
      }
    });
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);
      // Optional: Show success message or navigate to cart

    }
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

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStarArray(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  getOriginalPrice(): number {
    if (this.product && this.product.discountPercentage > 0) {
      return this.product.price / (1 - this.product.discountPercentage / 100);
    }
    return this.product?.price || 0;
  }
}

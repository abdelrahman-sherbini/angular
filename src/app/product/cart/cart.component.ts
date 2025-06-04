import {Component, OnInit} from '@angular/core';
import {CartItem} from '../../model/CartItem';
import {CartService} from '../../services/cart';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  isProcessing = false;
  isCompleted = false;
  progressPercent = 0;
  currentStep = 0;
  orderNumber = '';


  private processingSteps = [
    { name: 'Validating Payment', duration: 1500 },
    { name: 'Preparing Order', duration: 1200 },
    { name: 'Arranging Shipping', duration: 1000 },
    { name: 'Sending Confirmation', duration: 800 }
  ];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }
  startCheckout() {
    this.isProcessing = true;
    this.progressPercent = 0;
    this.currentStep = 0;

    this.processCheckout();
  }

  private processCheckout() {
    let totalDuration = this.processingSteps.reduce((sum, step) => sum + step.duration, 0);
    let elapsed = 0;

    this.processingSteps.forEach((step, index) => {
      setTimeout(() => {
        this.currentStep = index + 1;
        elapsed += step.duration;
        this.progressPercent = Math.round((elapsed / totalDuration) * 100);

        if (index === this.processingSteps.length - 1) {
          // Complete the checkout
          setTimeout(() => {
            this.completeCheckout();
          }, 500);
        }
      }, elapsed);
    });
  }

  private completeCheckout() {
    this.progressPercent = 100;
    this.orderNumber = this.generateOrderNumber();

    // Clear the cart
    this.cartService.clearCart();

    // Show success message
    setTimeout(() => {
      this.isProcessing = false;
      this.isCompleted = true;
    }, 500);
  }

  private generateOrderNumber(): string {
    return 'ORD-' + Date.now().toString().slice(-8);
  }

  resetCheckout() {
    this.isProcessing = false;
    this.isCompleted = false;
    this.progressPercent = 0;
    this.currentStep = 0;
    this.orderNumber = '';
  }
  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  increaseQuantity(productId: number) {
    const item = this.cartItems.find(item => item.product.id === productId);
    if (item) {
      this.cartService.updateQuantity(productId, item.quantity + 1);
    }
  }

  decreaseQuantity(productId: number) {
    const item = this.cartItems.find(item => item.product.id === productId);
    if (item) {
      this.cartService.updateQuantity(productId, item.quantity - 1);
    }
  }

  clearCart() {
    this.cartService.clearCart();
  }

  getTotalItems(): number {
    return this.cartService.getItemCount();
  }

  getSubtotal(): number {
    return this.cartService.getCartTotal();
  }

  getTax(): number {
    return this.getSubtotal() * 0.08; // 8% tax
  }

  getTotal(): number {
    return this.getSubtotal() + this.getTax();
  }
}

import { Injectable } from '@angular/core';
import {CartItem} from '../model/CartItem';
import {BehaviorSubject} from 'rxjs';
import {ProductDetailModel} from '../model/ProductDetailModel';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  constructor() {
    this.loadFromLocalStorage();
  }
  cart$ = this.cartSubject.asObservable();

  private savetoLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
  private loadFromLocalStorage() {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData);
      this.cartSubject.next([...this.cartItems]);
    }
  }
  addToCart(product: ProductDetailModel, quantity: number = 1) {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }

    this.cartSubject.next([...this.cartItems]);
    this.savetoLocalStorage();
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.cartSubject.next([...this.cartItems]);
    this.savetoLocalStorage();
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.cartItems.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.cartSubject.next([...this.cartItems]);
      }
    }
    this.savetoLocalStorage();
  }

  clearCart() {
    this.cartItems = [];
    this.cartSubject.next([]);
    this.savetoLocalStorage();
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  getItemCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }
}

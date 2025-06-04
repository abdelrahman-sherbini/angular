import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {CartService} from '../../services/cart';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    RouterLink,RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private cartService: CartService) {
    this.cartItemCount = this.cartService.getItemCount();
    this.cartService.cart$.subscribe(() => {
      this.cartItemCount = this.cartService.getItemCount();
    });
  }
  protected readonly RouterLink = RouterLink;
  cartItemCount: number;
}

// cart.service.ts
import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: Product[] = [];
  totalItems: number = 0;

  addToCart(product: Product): void {
    const existingItem = this.cartItems.find(item => item.productId === product.productId);
    if (existingItem) {
      // Increment quantity if product already exists in cart
      existingItem.quantity++;
    } else {
      // Add product to cart with quantity 1 if it doesn't exist in cart
      this.cartItems.push({ ...product, quantity: 1 });
    }
    // Update total items count
    this.updateTotalItems();
  }


  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.productId !== productId);
    // Update total items count
    this.updateTotalItems();
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateTotalItems();
  }

  private updateTotalItems(): void {
    this.totalItems = this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalAmount(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  
}

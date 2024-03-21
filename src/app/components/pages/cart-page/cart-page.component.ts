import { CartItem } from './../../../shared/models/CartItem.model';
import { Component, Inject } from '@angular/core';
import { CartService } from '../../../services/cart/cart.service';
import { Cart } from '../../../shared/models/Cart.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FoodService } from '../../../services/food/food.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  cart!: Cart;
  
  constructor(private cartService: CartService) {
    this.setCart();
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food.id);
    this.setCart(); // Update the cart (refresh)
  }

  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.id, quantity);
    this.setCart(); // Update the cart (refresh)
  }

  setCart() {
    this.cart = this.cartService.getCart(); 
  }

}

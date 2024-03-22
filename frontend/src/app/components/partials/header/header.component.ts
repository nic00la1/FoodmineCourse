import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../services/cart/cart.service';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../shared/models/User.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  cartQuantity = 0;
  user!: User;

  cartService = inject(CartService);
  userService = inject(UserService);

  constructor() {
    this.cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    });

    this.userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
  }
}

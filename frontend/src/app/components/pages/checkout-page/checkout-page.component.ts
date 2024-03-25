import { Component, inject } from '@angular/core';
import { Order } from '../../../shared/models/Order.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../../services/cart/cart.service';
import { UserService } from '../../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { TitleComponent } from '../../partials/title/title.component';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { OrderItemListComponent } from '../../partials/order-item-list/order-item-list.component';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [TitleComponent, ReactiveFormsModule, TextInputComponent, OrderItemListComponent],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent {
  order : Order = new Order();
  checkoutForm !: FormGroup;

  cartService = inject(CartService);
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private toastrService = inject(ToastrService);

  constructor() {
    const cart = this.cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  ngOnInit() : void {
    let {name, address} = this.userService.currentUser;
    this.checkoutForm = this.formBuilder.group({
      name: [name, Validators.required],
      address: [address, Validators.required]
    });
  }

  get fc() { // easy access to form controls
    return this.checkoutForm.controls;
  }

  createOrder() {
    if(this.checkoutForm.invalid) {
      this.toastrService.warning('Please fill the inputs', 'Invalid Inputs');
      return;
    }

    this.order.name = this.fc['name'].value;
    this.order.address = this.fc['address'].value;

    console.log(this.order);
  }
}

import { Component, inject } from '@angular/core';
import { Order } from '../../../shared/models/Order.model';
import { OrderService } from '../../../services/order/order.service';
import { Router } from '@angular/router';
import { TitleComponent } from '../../partials/title/title.component';
import { OrderItemListComponent } from '../../partials/order-item-list/order-item-list.component';
import { MapComponent } from '../../partials/map/map.component';
import { PaypalButtonComponent } from '../../partials/paypal-button/paypal-button.component';

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [TitleComponent, OrderItemListComponent, MapComponent, PaypalButtonComponent],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent {
  order : Order = new Order();
  orderService = inject(OrderService);
  router = inject(Router);

  constructor() {
    this.orderService.getNewOrderForCurrentUser().subscribe({
      next: (order) => {
        this.order = order;
        this.order.totalPrice = order.items.reduce((total, item) => total + Number(item.price), 0);
      },
      error: () => {
        this.router.navigateByUrl('/checkout');
      }
    });
  }
}

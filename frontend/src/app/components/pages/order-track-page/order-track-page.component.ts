import { Component, inject } from '@angular/core';
import { Order } from '../../../shared/models/Order.model';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order/order.service';
import { CommonModule } from '@angular/common';
import { OrderItemListComponent } from '../../partials/order-item-list/order-item-list.component';
import { MapComponent } from '../../partials/map/map.component';
import { TitleComponent } from '../../partials/title/title.component';

@Component({
  selector: 'app-order-track-page',
  standalone: true,
  imports: [CommonModule, OrderItemListComponent, MapComponent, TitleComponent],
  templateUrl: './order-track-page.component.html',
  styleUrl: './order-track-page.component.css'
})
export class OrderTrackPageComponent {
  order !: Order;
  activatedRoute = inject(ActivatedRoute)
  orderService = inject(OrderService)

  constructor() {
    const params = this.activatedRoute.snapshot.params;
    if (!params['orderId']) return;

    this.orderService.trackOrderById(params['orderId']).subscribe(order => {
      this.order = order;
      this.order.totalPrice = order.items.reduce((total, item) => total + Number(item.price), 0);
    });
  }
}

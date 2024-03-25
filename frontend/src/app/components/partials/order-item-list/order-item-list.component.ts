import { Component, Input } from '@angular/core';
import { Order } from '../../../shared/models/Order.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'order-item-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './order-item-list.component.html',
  styleUrl: './order-item-list.component.css'
})
export class OrderItemListComponent {
  @Input()
  order!:Order;
}

import { Injectable, inject } from '@angular/core';
import { Order } from '../../shared/models/Order.model';
import { HttpClient } from '@angular/common/http';
import { ORDER_CREATE_URL } from '../../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private http = inject(HttpClient)

  create(order : Order) {
    return this.http.post<Order>(ORDER_CREATE_URL, order);
  }
}

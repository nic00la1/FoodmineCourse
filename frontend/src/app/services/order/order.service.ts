import { Injectable, inject } from '@angular/core';
import { Order } from '../../shared/models/Order.model';
import { HttpClient } from '@angular/common/http';
import { ORDER_CREATE_URL, ORDER_NEW_FOR_CURRENT_USER_URL } from '../../shared/constants/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private http = inject(HttpClient)

  create(order : Order) {
    return this.http.post<Order>(ORDER_CREATE_URL, order);
  }

  getNewOrderForCurrentUser() : Observable<Order> {
    return this.http.get<Order>(ORDER_NEW_FOR_CURRENT_USER_URL);
  }
}

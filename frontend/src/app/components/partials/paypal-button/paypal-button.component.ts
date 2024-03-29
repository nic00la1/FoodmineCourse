import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { Order } from '../../../shared/models/Order.model';
import { OrderService } from '../../../services/order/order.service';
import { CartService } from '../../../services/cart/cart.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// window.paypal
declare var paypal: any;

@Component({
  selector: 'paypal-button',
  standalone: true,
  imports: [],
  templateUrl: './paypal-button.component.html',
  styleUrl: './paypal-button.component.css'
})
export class PaypalButtonComponent {
  @Input()
  order !: Order;

  @ViewChild('paypal', {static: true})
  paypalElement!: ElementRef;

  private orderService = inject(OrderService);
  private cartService = inject(CartService);
  private router = inject(Router);
  private toastrService = inject(ToastrService);
  


  ngOnInit(): void {
    const self = this
    paypal
    .Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: self.order.totalPrice,
              },
            },
          ],
        });
      },

      onApprove: async (data: any, actions: any) => {
        const payment = await actions.order.capture();
        this.order.paymentId = payment.id;
        self.orderService.pay(this.order).subscribe(
          {
            next: (orderId) => {
              this.cartService.clearCart();
              this.router.navigateByUrl('/track/' + orderId);
              this.toastrService.success(
                'Payment Saved Successfully',
                'Success'
              );
            },
            error: (error) => {
              this.toastrService.error('Payment Save Failed', 'Error');
            }
          }
        );
      },

      onError: (err: any) => {
        this.toastrService.error('Payment Failed', 'Error');
        console.log(err);
      },
    })
    .render(this.paypalElement.nativeElement);

  }

}

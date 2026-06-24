import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { CheckoutDetails } from '../basket/basket-item';
import { BasketService } from '../basket/basket.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './checkout-form.html',
  styleUrl: './checkout-form.css',
})
export class CheckoutForm {
  private basketService = inject(BasketService);

  protected checkoutInProgress = signal<boolean>(false);
  protected orderNumber = signal<number | undefined>(undefined);
  protected checkoutErrors = signal(false);

  touchedInvalid = (model: NgModel): boolean | null => model.touched && model.invalid;

  checkout(checkoutDetails: CheckoutDetails): void {
    this.checkoutInProgress.set(true);
    this.basketService.checkout(checkoutDetails).subscribe({
      next: ({ orderNumber }) => {
        this.orderNumber.set(orderNumber);
      },
      error: () => {
        this.checkoutInProgress.set(false);
        this.checkoutErrors.set(true);
      },
    });
  }
}

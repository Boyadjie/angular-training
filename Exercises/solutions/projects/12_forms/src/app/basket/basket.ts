import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BasketService } from './basket.service';
import { CheckoutForm } from './checkout-form/checkout-form';
import { CheckoutReactiveForm } from './checkout-reactive-form/checkout-reactive-form';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.html',
  imports: [CurrencyPipe, FormsModule, CheckoutForm, CheckoutReactiveForm],
})
export class Basket {
  private basketService = inject(BasketService);

  protected items = this.basketService.items;

  protected total = this.basketService.total;

  protected reactive = false;
}

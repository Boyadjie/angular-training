import { Component, computed, inject } from '@angular/core';
import { BasketService } from './basket.service';
import { CurrencyPipe } from '@angular/common';
import { CheckoutForm } from '../checkout-form/checkout-form';

@Component({
  selector: 'app-basket',
  imports: [CurrencyPipe, CheckoutForm],
  templateUrl: './basket.html',
  styleUrl: './basket.css',
})
export class Basket {
  private basketService = inject(BasketService);
  basketItems = this.basketService.items;
  total = this.basketService.total;
  numberOfItems = computed<number>(() => this.basketService.items().length)
}

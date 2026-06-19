import { Component, input, output } from '@angular/core';
import { Product } from './product';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
  imports: [UpperCasePipe, CurrencyPipe],
})
export class ProductCard {
  product = input.required<Product>();
  addToBasket = output<Product>();

  onClick = () => {
    this.addToBasket.emit(this.product());
  };
}

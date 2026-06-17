import { Component, computed, inject } from '@angular/core';
import { Basket } from '../basket/basket';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  basketService = inject(Basket)

  numberOfItems = computed<number>(() => this.basketService.items().length)
}

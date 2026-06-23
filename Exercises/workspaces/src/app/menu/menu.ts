import { Component, computed, inject } from '@angular/core';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  basketService = inject(BasketService)

  numberOfItems = computed<number>(() => this.basketService.items().length)
}

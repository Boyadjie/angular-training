import { Component, computed, inject } from '@angular/core';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.html',
})
export class Menu {
  private basketService = inject(BasketService);

  numberOfItems = computed<number>(() => this.basketService.items().length);
}

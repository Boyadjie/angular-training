import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.html',
  imports: [RouterLink],
})
export class Menu {
  private basketService = inject(BasketService);

  numberOfItems = computed<number>(() => this.basketService.items().length);
}

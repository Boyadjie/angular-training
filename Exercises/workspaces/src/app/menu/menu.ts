import { Component, computed, inject } from '@angular/core';
import { BasketService } from '../basket/basket.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  basketService = inject(BasketService)

  numberOfItems = computed<number>(() => this.basketService.items().length)
}

import { computed, Service, signal } from '@angular/core';
import { BasketItem } from './basket-item';

@Service()
export class Basket {
  private _items = signal<BasketItem[]>([]);
  items = this._items.asReadonly();

  total = computed(() => this._items().reduce((total, { price }) => total + price, 0));

  addItem = (newItem: BasketItem): void => {
    this._items.update((items) => [...items, newItem]);
  }
}

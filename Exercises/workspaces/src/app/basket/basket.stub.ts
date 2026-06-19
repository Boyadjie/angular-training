import { Service, signal } from '@angular/core';
import { BasketItem } from './basket-item';
import { Basket } from './basket';

@Service()
export class BasketStub implements Partial<Basket> {
  items = signal<BasketItem[]>([]);

  total = signal(0);

  addItem = (newItem: BasketItem): void => {
    this.items.update((items) => [...items, newItem]);
  }
}

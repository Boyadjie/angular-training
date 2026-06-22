import { Service, signal } from '@angular/core';
import { BasketItem } from './basket-item';
import { Basket } from './basket';
import { Observable, of } from 'rxjs';

@Service()
export class BasketStub implements Partial<Basket> {
  items = signal<BasketItem[]>([]);

  total = signal(0);

  addItem = (productId: string): Observable<BasketItem> => {
    return of({ id: productId, title: '', price: 0 })
  }
}

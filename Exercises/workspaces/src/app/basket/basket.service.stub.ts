import { Service, signal } from '@angular/core';
import { BasketItem } from './basket-item';
import { BasketService } from './basket.service';
import { Observable, of } from 'rxjs';

@Service()
export class BasketServiceStub implements Partial<BasketService> {
  items = signal<BasketItem[]>([]);

  total = signal(0);

  addItem = (productId: string): Observable<BasketItem> => {
    return of({ id: productId, title: '', price: 0 })
  }
}

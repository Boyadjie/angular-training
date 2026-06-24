import { computed, inject, Service, signal } from '@angular/core';
import { BasketItem, CheckoutDetails, CheckoutOrder } from './basket-item';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Service()
export class BasketService {
  private httpClient = inject(HttpClient);
  private _items = signal<BasketItem[]>([]);
  items = this._items.asReadonly();

  total = computed(() => this._items().reduce((total, { price }) => total + price, 0));

  fetchBasket = (): Observable<BasketItem[]> => {
    return this.httpClient
      .get<BasketItem[]>('http://localhost:8080/api/basket')
      .pipe(tap((basketItems) => this._items.set(basketItems)));
  };

  addItem = (productId: string): Observable<BasketItem> => {
    return this.httpClient
      .post<BasketItem>('http://localhost:8080/api/basket', { productId })
      .pipe(tap((item) => this._items.update((items) => [...items, item])));
  };

  checkout(checkoutDetails: CheckoutDetails): Observable<CheckoutOrder> {
    return this.httpClient
      .post<CheckoutOrder>(
        'http://localhost:8080/api/basket/checkout',
        checkoutDetails
      )
      .pipe(tap(() => this._items.set([])));
  }
}

import { computed, inject, Service, signal } from '@angular/core';
import { Product } from '../product-card/product';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Service()
export class Catalog {
  private httpClient = inject(HttpClient);
  private _products = signal<Product[]>([])
  products = this._products.asReadonly();
  
  hasProductsInStock = computed<boolean>(() =>
    this.products().some((product) => product.stock > 0),
  );
  
  fetchProducts(): Observable<Product[]> {
    return this.httpClient
      .get<Product[]>('http://localhost:8080/api/products')
      .pipe(tap((products) => this._products.set(products)));
  }

  decreaseStock = (id: string) => {
    this._products.update((products) =>
      products.map((product) =>
        id === product.id && product.stock > 0 ? { ...product, stock: product.stock - 1 } : product,
      ),
    );
  };
}

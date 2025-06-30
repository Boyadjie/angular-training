import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { APP_TITLE } from './app.token';
import { BasketService } from './basket/basket.service';
import { CatalogService } from './catalog/catalog.service';
import { Menu } from './menu/menu';
import { ProductCard } from './product/product-card';
import { Product } from './product/product.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [CurrencyPipe, Menu, ProductCard],
})
export class App {
  private catalogService = inject(CatalogService);

  private basketService = inject(BasketService);

  appTitle = inject(APP_TITLE);

  products = this.catalogService.products;

  hasProductsInStock = this.catalogService.hasProductsInStock;

  total = this.basketService.total;

  constructor() {
    this.catalogService.fetchProducts().subscribe();
    this.basketService.fetchBasket().subscribe();
  }

  addToBasket({ id }: Product) {
    this.basketService.addItem(id).subscribe(() => this.catalogService.decreaseStock(id));
  }
}

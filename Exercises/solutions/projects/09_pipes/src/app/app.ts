import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { APP_TITLE } from './app.token';
import { BasketService } from './basket/basket.service';
import { CatalogService } from './catalog/catalog.service';
import { Menu } from './menu/menu';
import { ProductCard } from './product/product-card';
import { Product } from './product/product';

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

  addToBasket({ id, title, price }: Product) {
    this.basketService.addItem({ id, title, price });
    this.catalogService.decreaseStock(id);
  }
}

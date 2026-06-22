import { Component, computed, inject, signal } from '@angular/core';
import { Product } from './product-card/product';
import { ProductCard } from './product-card/product-card';
import { Menu } from './menu/menu';
import { Catalog } from './catalog/catalog';
import { Basket } from './basket/basket';
import { APP_TITLE } from './app.token';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Menu, ProductCard, CurrencyPipe],
})
export class App {
  catalogService = inject(Catalog);
  basketService = inject(Basket);

  appTitle = inject(APP_TITLE);

  isHovered = false;

  total = this.basketService.total;
  products = this.catalogService.products;

  hasProductsInStock = this.catalogService.hasProductsInStock;

  constructor() {
    this.catalogService.fetchProducts().subscribe();
    this.basketService.fetchBasket().subscribe();
  }

  toggleHover = () => {
    this.isHovered = !this.isHovered;
  };

  addToBasket = (productId: string) => {
    this.basketService.addItem(productId).subscribe(() => this.catalogService.decreaseStock(productId));
  };
}

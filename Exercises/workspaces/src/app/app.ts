import { Component, inject } from '@angular/core';import { ProductCard } from './product-card/product-card';
import { Menu } from './menu/menu';
import { CatalogService } from './catalog/catalog.service';
import { BasketService } from './basket/basket.service';
import { APP_TITLE } from './app.token';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Menu, ProductCard, CurrencyPipe],
})
export class App {
  catalogService = inject(CatalogService);
  basketService = inject(BasketService);

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

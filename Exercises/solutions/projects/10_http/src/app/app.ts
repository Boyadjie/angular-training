import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { APP_TITLE } from './app.token';
import { BasketService } from './basket/basket.service';
import { CatalogService } from './catalog/catalog.service';
import { Menu } from './menu/menu';
import { Product } from './product/product';
import { ProductCard } from './product/product-card';

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

  isHovered = false;

  constructor() {
    this.catalogService.fetchProducts().subscribe();
    this.basketService.fetchBasket().subscribe();
  }

  toggleIsHovered() {
    this.isHovered = !this.isHovered;
  }

  addToBasket({ id }: Product) {
    this.basketService.addItem(id).subscribe(() => this.catalogService.decreaseStock(id));
  }
}

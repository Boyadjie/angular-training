import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ProductCard } from './product/product-card';
import { CatalogService } from './catalog.service';
import { BasketService } from '../basket/basket.service';
import { APP_TITLE } from '../app.token';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
  imports: [ProductCard, CurrencyPipe, RouterLink],
})
export class Catalog {
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
    this.basketService
      .addItem(productId)
      .subscribe(() => this.catalogService.decreaseStock(productId));
  };
}

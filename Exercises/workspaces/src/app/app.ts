import { Component, computed, inject, signal } from '@angular/core';
import { Product } from './product-card/product';
import { ProductCard } from './product-card/product-card';
import { Menu } from './menu/menu';
import { Catalog } from './catalog/catalog';
import { Basket } from './basket/basket';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Menu, ProductCard],
})
export class App {
  catalogService = inject(Catalog)
  basketService = inject(Basket)

  title = 'my first component';
  isHovered = false;
  
  total = this.basketService.total;
  products = this.catalogService.products

  toggleHover = () => {
    this.isHovered = !this.isHovered;
  };

  addToBasket = (product: Product) => {
    this.basketService.addItem(product);
    this.catalogService.decreaseStock(product);
  };
}

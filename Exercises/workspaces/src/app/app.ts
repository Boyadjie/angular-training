import { Component, computed, inject, signal } from '@angular/core';
import { Product } from './product-card/product';
import { ProductCard } from './product-card/product-card';
import { Menu } from './menu/menu';
import { Catalog } from './catalog/catalog';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Menu, ProductCard],
})
export class App {
  catalogService = inject(Catalog)

  title = 'my first component';
  isHovered = false;
  total = signal<number>(0);

  products = this.catalogService.products

  toggleHover = () => {
    this.isHovered = !this.isHovered;
  };

  addToBasket = (product: Product) => {
    this.total.update((total) => (total += product.price));
    
    this.catalogService.decreaseStock(product);
  };
}

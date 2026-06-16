import { Component, computed, signal } from '@angular/core';
import { Product } from './product-card/product';
import { ProductCard } from './product-card/product-card';
import { Menu } from './menu/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Menu, ProductCard],
})
export class App {
  title = 'my first component';
  isHovered = false;
  total = signal<number>(0);

  products = signal<Product[]>([
    {
      id: 'welsch',
      title: 'Coding the welsch',
      description: 'Tee-shirt col rond - Homme',
      photo: '/assets/coding-the-welsch.jpg',
      price: 20,
      stock: 2,
    },
    {
      id: 'world',
      title: 'Coding the world',
      description: 'Tee-shirt col rond - Homme',
      photo: '/assets/coding-the-world.jpg',
      price: 18,
      stock: 1,
    },
    {
      id: 'vador',
      title: 'Duck Vador',
      description: 'Tee-shirt col rond - Femme',
      photo: '/assets/coding-the-stars.jpg',
      price: 21,
      stock: 2,
    },
    {
      id: 'snow',
      title: 'Coding the snow',
      description: 'Tee-shirt col rond - Femme',
      photo: '/assets/coding-the-snow.jpg',
      price: 19,
      stock: 2,
    },
  ]);

  toggleHover = () => {
    this.isHovered = !this.isHovered;
  };

  addToBasket = (product: Product) => {
    this.total.update((total) => (total += product.price));
    product.stock--;
  };

  get hasProductsInStock() {
    return computed<boolean>(() => this.products().some((product) => product.stock > 0));
  }
}

import { Component } from '@angular/core';
import { Menu } from './menu/menu';
import { Product } from './product-card/product';
import { ProductCard } from './product-card/product-card';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [Menu, ProductCard],
})
export class App {
  products: Product[] = [
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
  ];

  total = 0;

  isHovered = false;

  get hasProductsInStock(): boolean {
    return this.products.some(({ stock }) => stock > 0);
  }

  toggleIsHovered() {
    this.isHovered = !this.isHovered;
  }

  addToBasket(product: Product) {
    product.stock -= 1;
    this.total += product.price;
  }
}

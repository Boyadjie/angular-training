import { Service, signal } from '@angular/core';
import { Product } from '../product-card/product';
import { Catalog } from './catalog';

@Service()
export class CatalogStub implements Partial<Catalog> {
  products = signal<Product[]>([
    { id: 'ID_1', title: 'TITLE_1', description: 'DESC_1', photo: 'PHOTO_1', price: 3, stock: 2 },
    { id: 'ID_2', title: 'TITLE_2', description: 'DESC_2', photo: 'PHOTO_2', price: 2, stock: 1 },
    { id: 'ID_3', title: 'TITLE_3', description: 'DESC_3', photo: 'PHOTO_3', price: 1, stock: 0 },
  ]);

  hasProductsInStock = signal(true);

  decreaseStock({id}: Product) {
    console.log(id);
  }
}

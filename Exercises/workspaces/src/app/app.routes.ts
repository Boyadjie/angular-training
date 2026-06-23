import { Routes } from '@angular/router';
import { Catalog } from './catalog/catalog';
import { Basket } from './basket/basket';

export const routes: Routes = [
  { path: 'catalog', component: Catalog, title: 'catalog' },
  { path: 'basket', component: Basket, title: 'basket' },
  { path: '**', redirectTo: 'catalog'}
];

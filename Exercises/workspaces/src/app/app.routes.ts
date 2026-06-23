import { Routes } from '@angular/router';
import { Catalog } from './catalog/catalog';
import { Basket } from './basket/basket';
import { basketGuard } from './basket/basket.guard';
import { EmptyBasket } from './empty-basket/empty-basket';

export const routes: Routes = [
  { path: 'catalog', component: Catalog, title: 'catalog' },
  { path: 'basket', component: Basket, title: 'basket', canMatch: [basketGuard] },
  { path: 'basket', component: EmptyBasket, title: 'basket-fallback' },
  { path: '**', redirectTo: 'catalog'}
];

import { Routes } from '@angular/router';
import { EmptyBasket } from './empty-basket/empty-basket';
import { Basket } from './basket/basket';
import { basketGuard } from './basket/basket.guard';
import { Catalog } from './catalog/catalog';
import { PRODUCT_DETAILS_PARAM_KEY } from './product-details/product-details.config';

export const routes: Routes = [
  {
    path: 'catalog',
    component: Catalog,
  },
  {
    path: `product/:${PRODUCT_DETAILS_PARAM_KEY}`,
    loadComponent: () => import('./product-details/product-details'),
  },
  {
    path: 'basket',
    component: Basket,
    canMatch: [basketGuard],
  },
  {
    path: 'basket',
    component: EmptyBasket,
  },
  {
    path: '**',
    redirectTo: 'catalog',
  },
];

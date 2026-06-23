import { inject } from "@angular/core";
import { CanMatchFn } from "@angular/router";
import { BasketService } from "./basket.service";

export const basketGuard: CanMatchFn = () => {
  const basketService = inject(BasketService);

  return basketService.items().length > 0;
};
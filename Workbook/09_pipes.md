## Lab 9: Pipes

In this lab, you'll use pipes to format the application content.

### `ProductComponent`

Let's start by using pipes provided by the Angular framework:

- Use the `uppercase` pipe to display the product title in uppercase

- Use the `currency` pipe to display the product price with the currency

At the moment, notice that the price is in `$` and formatted for the `en-US` locale (example: **"$21"**).
But we need to display it in `€` for the `fr` locale (example: **"21 €"**).

Let's fix this!

- First, register the `"fr"` locale in your application

```ts
// src/app/app.config.ts
import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";

registerLocaleData(localeFr);
```

- Next, provide `LOCALE_ID` and `DEFAULT_CURRENCY_CODE` in the app config

```ts
// src/app/app.config.ts
import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from "@angular/core";

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: "fr" },
    { provide: DEFAULT_CURRENCY_CODE, useValue: "EUR" },
  ],
};
```

The product price should now be displayed correctly.

### `AppComponent`

- Use the `currency` pipe to display the basket total

<div class="pb"></div>


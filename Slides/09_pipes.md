# Pipes

<!-- .slide: class="page-title" -->



## Summary

<!-- .slide: class="toc" -->

- [Getting started](#/1)
- [Workspace](#/2)
- [Technical prerequisites](#/3)
- [Components](#/4)
- [Communication between components](#/5)
- [Unit testing](#/6)
- [Control flow](#/7)
- [Signals](#/8)
- [Services](#/9)
- **[Pipes](#/10)**
- [Http](#/11)
- [Routing](#/12)
- [Forms](#/13)
- [Appendix](#/14)

Notes :



## Pipes - Definition

- Special operator in Angular template expressions
- Transform data declaratively in your template
- Transformation function are declared once and then used across multiple templates
- Angular provides a lots of pipes for common use cases...

```ts
import {
  LowerCasePipe, UpperCasePipe, TitleCasePipe,
  CurrencyPipe, DecimalPipe, PercentPipe,
  DatePipe, JsonPipe, SlicePipe, KeyValuePipe,
} from '@angular/common';
```

- ... but you can also create custom pipes based on your business logic

Notes :



## Pipes - Usage in template

- Are applied using the "`|`" symbol
- Can be chained
- Additional parameters can be passed using the "`:`" symbol

```ts
import { Component } from '@angular/core';
import { DatePipe, UpperCasePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [DatePipe, UpperCasePipe, CurrencyPipe]
  template: `
    <p>{{ myDate | date }}</p>                          <!-- 29 août 2023 -->
    <p>{{ myDate | date | uppercase }}</p>              <!-- 29 AOÛT 2023 -->
    <p>{{ myPrice | currency : 'EUR' : 'symbol' }}</p>  <!-- 123,46 €     -->
  `,
})
export class App {
  myDate = new Date();
  myPrice = 123.456789;
}
```

Notes :



## Pipes - Configuration

Some Angular pipes can be configured globally

Here's an example with the `CurrencyPipe`

- Depending on the locale:
  - should display `$3.50` for United States (this is the default behavior)
  - should display `3,50 $` for France

- You may also need to configure the default symbol to be `€` instead of `$`:
  - should display `€3.50` for United States
  - should display `3,50 €` for France

Notes :



## Pipes - Configuration | CurrencyPipe

- Here's the configuration to display the currency in EUR for France (`3,50 €`)

```ts
// src/app/app.config.ts

import { ApplicationConfig, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';

// Defines how to format currency, date, ... in french
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
  ],
};
```

Notes :



## Pipes - Usage in class

- Can be instantiated directly in TypeScript code (using `new` operator)
- Can also be injected like any provider...
  - ...but must be provided in the `providers` array (Component or ApplicationConfig)
  - the injected pipe will respect the global configuration, if any

```ts
import { Component, inject } from '@angular/core';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';

@Component ({ selector: 'app-root', providers: [CurrencyPipe] })
class App {
  constructor() {
    console.log(new UpperCasePipe().transform('Hello World!'));   // <-- HELLO WORLD!

    console.log(inject(CurrencyPipe).transform(123.456789));      // <-- 123,46 €
  }
}
```

Notes :



## Pipes - Pure

- Pipes are pure by default
- When Angular re-evaluate a template, it will only re-evaluate the pipe if its input value **reference** has changed

Notes :



## Pipes - Impure

- Angular always re-evaluate "impure" pipe, even if its input value **reference** has not changed
  - Should be used for input value such as `Array` or `Object` that may be mutated over time

Example: because Angular's `JsonPipe` is defined as `impure`, after clicking on the button, the mutated object will be properly displayed in the UI.

```ts
import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [JsonPipe],
  template:
    `<pre>{{ data | json }}</pre>
    
    <button (click)=" data.msg = 'Bye' ">Mutate</button>`,
})
export class App {
  data = { msg: 'Hello' };
}
```

Notes :



## Pipes - Testing

- A Pipe is nothing but a function!
- Instantiate the pipe in a `beforeEach` hook
- Call the `transform` method to test all possible cases

```ts
import { JoinArrayPipe } from './pipes/join-array.pipe';

describe('JoinArrayPipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new JoinArrayPipe();
  });

  it('should works', () => {
    const output = pipe.transform(['apple', 'orange', 'banana'], ', ');

    expect(output).toEqual('apple, orange, banana');
  });
});
```

Notes :



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp9" -->

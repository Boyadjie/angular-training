# Components (part 2)

<!-- .slide: class="page-title" -->



## Summary

<!-- .slide: class="toc" -->

- [Getting started](#/1)
- [Workspace](#/2)
- [Technical prerequisites](#/3)
- [Components (part 1)](#/4)
- **[Components (part 2)](#/5)**
- [Unit testing](#/6)
- [Control flow](#/7)
- [Signals](#/8)
- [Services](#/9)
- [Pipes](#/10)
- [Http](#/11)
- [Routing](#/12)
- [Forms](#/13)
- [Appendix](#/14)

Notes :



## Component - Input 1/3

- Use the `input()` function to declare a component class property as input

- To read the value contained in the input, you need to call it as a function

```ts
import { Component, input } from '@angular/core';

@Component ({
  selector: 'app-counter',
  template: `<p>{{ count() }}</p>`
})
export class Counter {
  count = input<number>(0);
}
```

- Inputs without a default value have an implicit `undefined` value

```ts
count = input<number>(); // is equivalent to `input<number | undefined>();`
```

Notes :



## Component - Input 2/3

- Use the `input.required()` function to declare a component class property as required input

```ts
import { Component, input } from '@angular/core';

@Component ({
  selector: 'app-counter',
  template: `<p>{{ count() }}</p>`
})
export class Counter {
  count = input.required<number>();
}
```

- When using the component, Angular will throw an error if the required input is missing

```html
<app-counter />

<!-- ❌ Required input 'count' from Counter component must be specified. -->
```

Notes :



## Component - Input 3/3

- The consumer of this component must bind to the required input in its template

```ts
import { Component } from '@angular/core';
import { Counter } from './counter/counter.ts';

@Component ({
  selector: 'app-root',
  imports [Counter],
  template: `<app-counter [count]="parentCount" />`
})
export class App {
  protected parentCount = 5;
}
```

Notes :



## Component - Output 1/2

- Use the `output()` function to declare a component class property as output

```ts
import { Component, output } from '@angular/core';

@Component ({
  selector: 'app-counter',
  template: `<button (click)="onClick()">{{ count }}</button>`
})
export class Counter {
  protected count = 0;

  countChange = output<number>();

  protected onClick() {
    this.count += 1;
    this.countChange.emit(this.count);
  }
}
```

Notes :



## Component - Output 2/2

- The consumer of this component can bind to the event in its template

```ts
import { Component } from '@angular/core';
import { Counter } from './counter/counter.ts';

@Component ({
  selector: 'app-root',
  imports [Counter],
  template:
    `<app-counter (countChange)="updateCount($event)" />
     <p>Count: {{ parentCount }}</p>`
})
export class App {
  protected parentCount: number | undefined = undefined;

  protected updateCount(count: number) {
    this.parentCount = count;
  }
}
```

- **Output events** are never propagated to the consumer's parent component, whereas **native DOM events** are (event bubbling)

Notes :
The `parentCount` is deliberately set to `undefined` to show that it is the `Counter` component which has ownership of the data.
This problem will be solved with `model`.



## Component - Model input 1/4

- Use the `model()` function to declare a component class property as model input

- Unlike regular inputs, model inputs allow the component author to write values into the property

```ts
import { Component, model } from '@angular/core';

@Component ({
  selector: 'app-counter',
  template: `<button (click)="onClick()">{{ count }}</button>`
})
export class Counter {
  count = model<number>(0);

  protected onClick() {
    this.count.update((count) => count + 1);
  }
}
```

Notes :



## Component - Model input 2/4

- The consumer of this component can bind to both "property" and "event" in its template

```ts
import { Component } from '@angular/core';
import { Counter } from './counter/counter.ts';

@Component ({
  selector: 'app-root',
  imports [Counter],
  template: `
    <app-counter [count]="parentCount" (countChange)="updateCount($event)" />
  `
})
export class App {
  protected parentCount = 5;

  protected updateCount(count: number) {
    this.parentCount = count;
  }
}
```

- The `output` name is based on the `input` name but with the suffix: `"Change"`

Notes :



## Component - Model input 3/4

- Use the "Banana in a box" [🍌] syntax to easily achieve two-way data binding

```ts
import { Component } from '@angular/core';
import { Counter } from './counter/counter.ts';

@Component ({
  selector: 'app-root',
  imports [Counter],
  template: `
    <app-counter [(count)]="parentCount" />
  `
})
export class App {
  protected parentCount = 5;

  protected updateCount(count: number) {
    this.parentCount = count;
  }
}
```

Notes :



## Component - Model input 4/4

- Unlike `input`s which are "readonly", `model`s are "writable"

```ts
export class Counter {
  count = model(0);
  constructor() {
    console.log(this.count());          // <-- output: 0

    this.count.set(1);
    console.log(this.count());          // <-- output: 1

    this.count.update((c) => c + 1);
    console.log(this.count());          // <-- output: 2
  }
}
```

- `input` and `model` are in fact "**signals**"
- `.set()` and `.update()` methods are part of the signals API
- Signals play a crucial role in the Angular reactivity model and whole chapter is devoted to them later in the training

Notes :



## Directives

- Live in the **component template**
- Needs a **host element** to be attached to
- Adds **additional behavior** to host elements in your template
- **Component**: yes! components are in fact directives that embed their own template 
- In the next chapters, we will see other directives ngModel, routerLink...
Notes :



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp4" -->

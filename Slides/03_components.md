# Components

<!-- .slide: class="page-title" -->



## Summary

<!-- .slide: class="toc" -->

- [Getting started](#/1)
- [Workspace](#/2)
- [Technical prerequisites](#/3)
- **[Components](#/4)**
- [Communication between components](#/5)
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



## Components - Definition 1/3

- Components are the **main building blocks** of Angular applications
- Each component represents a **part of a larger web page**
- Organizing an application into components helps **provide structure to your project**, clearly separating code into specific parts that are easy to maintain and grow over time

Notes :



## Components - Definition 2/3

- Defined with the `@Component` class decorator, which provides the component's metadata
  - must have a `selector` so that it can be inserted into any other component template
  - must have a `template` (or `templateUrl`) that defines what is to be displayed

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-hello',
  template: '<p>Hello world!</p>',
})
export class Hello {}
```

Notes :



## Components - Definition 3/3

- You build an application by composing multiple components together

- A component that depends on other components must import them in order to use them in its template

```ts
import { Component } from '@angular/core';
import { Hello } from './hello/hello.ts';

@Component({
  selector: 'app-root',
  imports: [Hello],
  template: `
    <h1>My Awesome App</h1>
    <app-hello />
  `,
})
export class App {}
```

Notes :



## Component - Template

- The template can be configured in two ways:
  - using a `template` property: string literal (as shown above)
  - using a `templateUrl` property: path to an HTML file (relative to the component)

```ts
// app.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {}
```

```html
<!-- app.html -->

<h1>My Awesome App</h1>
```

Notes :



## Component - Styles

The styles can be configured in two ways:

- using a `styles` property that contains the expected CSS rules

```ts
@Component ({
  styles: `h1 { font-weight: normal; }`
})
export class App {}
``` 

- using a `styleUrl` property that indicates a path to `.css` (or `.scss`) file

```ts
@Component ({
  styleUrl: './app.css'
})
export class App {}
```

```css
/* app.css */

h1 { font-weight: normal; }
```

Notes :



## Template syntax - Text interpolation

- Uses the syntax `{{ expression }}`
- The `expression` is converted into a `string` and displayed as such
- Angular defines a precise syntax for these expressions
  - accepts basic JavaScript expressions
  - more: https://angular.dev/guide/templates
- All `public` or `protected` component properties can be used in the template
- An expression used in template must not change the component state

```ts
@Component ({
  selector: 'app-product-card',
  template: `<p><img src="{{ product?.photo }}" /> {{ product?.title }}</p>`
})
export class ProductCard {
  protected product?: Product;
}
```

Notes :

- The 'Elvis operator' (optional chaining) is now part of ES2020 & Typescript 3.8
- `src="{{ product?.photo }}"` is OK but property binding is better `[src]="product?.photo"` (next slide)



## Template syntax - Property binding

- Generic syntax for setting the value of a **DOM property**
- Using the syntax `[propertyName]="expression"`

```html
<button [disabled]="isUnchanged">Save</button>  <!-- HTML property -->

<app-hero-form [hero]="currentHero" />          <!-- property of a component -->

<p [class.highlight]="isHighlight">Hello</p>    <!-- special case -->

<button [style.color]="isHighlight? 'orange': 'black'">Save</button> <!-- special case -->
```

Notes :

Indicate that there are no differences between the use of properties and interpolation
Angular will transform interpolation syntax into property binding



## Template syntax - Attribute binding

- Generic syntax for setting the value of an **HTML attribute** 
- Using the syntax `[attr.attributeName]="expression"`
- Pay attention to the difference between "DOM properties" and "HTML attributes"!

Example: `role` is a valid HTML attribute of the `<div>` tag, but there's no such DOM property!

```html
<div role="status">OK</div>
```

```html
<div [attr.role]="expression">OK</div>
```

```html
<div [role]="expression">NOT OK</div>

<!-- ❌ Can't bind to 'role' since it isn't a known property of 'div'. -->
```

Notes :




## Template syntax - Event binding

- Generic syntax for listening to an event of an HTML element
- Using the syntax `(eventName)="expression"`

```html
<button (click)="handler()">Save</button>       <!-- HTML event -->

<app-hero-form (deleted)="onHeroDeleted()" />   <!-- event of a component -->

<input (keyup.enter)="onEnter()" />             <!-- special case: pseudo events -->
```

Notes :



## Template syntax - Event binding | $event

- In this example, we listen to the `input` event of the `<input />` element

```ts
@Component ({
  selector: 'app-demo',
  template: `<input [value]="name" (input)="updateName($event.target)" />`,
})
export class Demo {
  name = 'Carl';

  updateName(eventTarget: EventTarget | null) {
    this.name = (eventTarget as HTMLInputElement).value;
  }
}
```

- `$event` refers to the native browser DOM `InputEvent`
- We achieve a *two-way data binding* using both property and event bindings
  - the **class** property `name` and the **template** input `value` will always be in sync

Notes :



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp3" -->

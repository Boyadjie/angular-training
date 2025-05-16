# Appendix

<!-- .slide: class="page-title" -->



## Summary

<!-- .slide: class="toc" -->

- [Getting started](#/1)
- [Workspace](#/2)
- [Technical prerequisites](#/3)
- [Components](#/4)
- [Unit testing](#/5)
- [Control flow](#/6)
- [Directives](#/7)
- [Signals](#/8)
- [Services](#/9)
- [Pipes](#/10)
- [Http](#/11)
- [Routing](#/12)
- [Forms](#/13)
- **[Appendix](#/14)**

Notes :



## Angular coding style guide
Angular provides a `coding style guide` that recaps the best practices in the Angular ecosystem.

**Follow its advices to improve your skills!**

https://angular.dev/style-guide

Notes :



## Appendix - Component view encapsulation 1/3

- By default, **component's styles are encapsulated** within the component's host element so that they **don't affect the rest of the application**

```ts
import { Component, ViewEncapsulation } from '@angular/core';

@Component ({
  selector: 'app-root',
  template: `<h1>Hello world</h1>`,
  styles: `h1 { color: red }`,
  encapsulation: ViewEncapsulation.Emulated, // <-- Default value
})
export class AppComponent {}
```

- At runtime, Angular adds **unique attributes** to achieve encapsulation

```css
h1[_ngcontent-ng-529479] { color: blue }
```

```html
<app-root _nghost-ng-529479>
  <h1 _ngcontent-ng-529479>Hello world</h1>
</app-root>
```

Notes :
Host bindings are covered in the Directives chapter (`@Directive({ host: ... })` which also applies to `@Component({ host: ... })`).



## Appendix - Component view encapsulation 2/3

- Use `:host {}` pseudo class to style the component's host element

```ts
import { Component } from '@angular/core';

@Component ({
  selector: 'app-root',
  template: `<h1>My Awesome App</h1>`,
  styles: `:host { display: block }`,
})
export class AppComponent {}
```

- At runtime, Angular transforms the pseudo class into **unique attributes**

```css
[_nghost-ng-529479] { display: block }
```

```html
<app-root _nghost-ng-529479>
  <h1 _ngcontent-ng-529479>Hello world</h1>
</app-root>
```

Notes :



## Appendix - Component view encapsulation 3/3

- If needed, use `ViewEncapsulation.None` to disable component's encapsulation
- Then, all styles defined in the component are global and can therefore affect the entire page
  - use with caution
  - use fairly unique CSS selectors

```ts
import { Component, ViewEncapsulation } from '@angular/core';

@Component ({
  selector: 'app-root',
  template: `<h1 class="app-root__title">Hello world</h1>`,
  styles: `
    h1 { color: red }                 /* ❌ Looks dangerous, affects all <h1> tags in the page */

    .app-root__title { color: red }   /* ✅ Looks fine, uses a fairly unique CSS selector */
  `,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}
```

Notes :



## Appendix - Component projection 1/3

- Allows to put HTML content inside the tag of an Angular component
- The `<ng-content />` directive allows reinserting the content in the component template

```ts
@Component({ selector: 'app-card', template:
  `<article>
    <ng-content />
  </article>`
})
export class CardComponent {}

@Component ({ selector: 'app-root', template:
  `<app-card>
    <header>Title</header>
    <section>Content</section>
  </app-card>`
})
export class AppComponent {}
```

Notes :



## Appendix - Component projection 2/3

- Ability to have multiple insertion points using the `select` property
- The select value must be a valid **CSS selector** targeting the HTML fragment to be used

```ts
@Component({ selector: 'app-card', template:
  `<article>
    <header> <ng-content select="[card-title]" /> </header>
    <section> <ng-content select="[card-content]"/> </section>
  </article>`
})
export class CardComponent {}

@Component ({ selector: 'app-root', template:
  `<app-card>
    <span card-title>Title</span>
    <span card-content>Content</span>
  </app-card>`
})
export class AppComponent {}
```

Notes :



## Appendix - Component projection 3/3

- Use `<ng-container>` to avoid adding unnecessary tags

```ts
@Component({ selector: 'app-card', template:
  `<article>
    <header> <ng-content select="[card-title]" /> </header>
    <section> <ng-content select="[card-content]"/> </section>
  </article>`
})
export class CardComponent {}

@Component ({ selector: 'app-root', template:
  `<app-card>
    <ng-container card-title>Title</ng-container>
    <ng-container card-content>Content</ng-container>
  </app-card>`
})
export class AppComponent {}
```

Notes :



## Appendix - Component lifecycle

- It is possible to execute code using component lifecycle hooks

- More infos: https://angular.dev/guide/components/lifecycle

```ts
import {
  Component, OnChanges, OnInit, AfterContentInit, AfterViewInit, OnDestroy, SimpleChanges
} from '@angular/core';

@Component ({/* ... */})
export class AppComponent implements
  OnChanges, OnInit, AfterContentInit, AfterViewInit, OnDestroy {

    constructor() {/* Perform tasks that does NOT depend on the component's inputs */}

    ngOnInit(): void {/* Perform tasks that depend on the component's inputs */}

    ngAfterContentInit(): void {/* ... */}

    ngAfterViewInit(): void {/* ... */}

    ngOnDestroy(): void {/* ... */}
  }
```

Notes :



## Appendix - Component lifecycle | OnInit

- `OnInit` lifecycle hook is frequently used for initialization
- because you can safely read component `input`s when this hook is triggered

```ts
import { Component, OnInit, input } from '@angular/core';

@Component ({/* ... */})
export class PostsComponent implements OnInit {
  userId = input.required<string>();

  protected posts?: Post[];

  ngOnInit() {
    // Doing this is the `constructor` will fail!
    // Because the property `userId` is `undefined` at the time the constructor is executed.
    this.fetchUserPosts(this.userId()).then((posts) => (this.posts = posts));
  }

  private fetchUserPosts(): Promise<Post[]> {/* ... */}
}
```

Notes :



## Appendix - Component lifecycle | OnDestroy

- `OnDestroy` lifecycle hook is frequently used for cleaning component

```ts
import { Component, OnDestroy } from '@angular/core';

@Component ({ 
  selector: 'app-interval',
  template: '<p>{{ data }}</p>'
})
export class IntervalComponent implements OnDestroy {
  protected data = 0;

  private interval = setInterval(() => this.data++, 1000);

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
```

Notes :



## Appendix - Comp. lifecycle hooks | DestroyRef

- `DestroyRef` allows you to achieve the same result as `ngOnDestroy`

```ts
import { Component, DestroyRef } from '@angular/core';

@Component ({ 
  selector: 'app-interval',
  template: '<p>{{ data }}</p>'
})
export class IntervalComponent {
  protected data = 0;

  private interval = setInterval(() => this.data++, 1000);

  constructor() {
    inject(DestroyRef).onDestroy(() => clearInterval(this.interval));
  }
}
```

😉 *It is considered a more modern approach*

Notes :



## Appendix - Component queries 1/2

- It is possible to access template details from the class using `viewChild`

- Retrieved informations are available as soon as `AfterViewInit` has been triggered

```ts
import { Component, viewChild, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-hello', template: `<h1>Hello world!</h1>`
})
export class HelloComponent {}

@Component({
  selector: 'app-root', template: `<app-hello />`
})
export class AppComponent implements OnInit, AfterViewInit {

  helloComponent = viewChild(HelloComponent);

  ngOnInit() { console.log(this.helloComponent()); }            // <-- output: undefined
  ngAfterViewInit() { console.log(this.helloComponent()); }     // <-- output: HelloComponent
}
```

Notes :



## Appendix - Component queries 2/2

- `afterNextRender` allows you to achieve (almost) the same result as `AfterViewInit`

- Invoked the next time the application finishes rendering

```ts
import { Component, viewChild, afterNextRender } from '@angular/core';

@Component({
  selector: 'app-hello', template: `<h1>Hello world!</h1>`
})
export class HelloComponent {}

@Component({
  selector: 'app-root', template: `<app-hello />`
})
export class AppComponent {

  helloComponent = viewChild(HelloComponent);

  constructor() {
    afterNextRender(() => console.log(this.helloComponent()));  // <-- output: HelloComponent
  }
}
```

Notes :



## Routing - RouterLinkActive 1/2

- Use `routerLinkActive` input to specify one or more CSS classes to be added when the linked route is active

```ts
@Component ({
  selector: 'app-nav',
  template: `
    <a routerLink="/" routerLinkActive="link-active"> Home </a>

    <a routerLink="/contacts" routerLinkActive="link-active"> Contact list </a>

    <a routerLink="/contacts/1" routerLinkActive="link-active"> Contact 1 </a>
  `,
  styles: `.link-active { color: blue }`,
})
export class NavComponent {}
```

Notes :



## Routing - RouterLinkActive 2/2

- Use `routerLinkActiveOptions` input to add the classes only when the URL matches the link exactly

```ts
@Component ({
  selector: 'app-nav',
  template: `
    <a
      routerLink="/"
      [routerLinkActive]="['link-active']"
      [routerLinkActiveOptions]="{ exact: true }"
    >
      Home
    </a>
  `,
  styles: `.link-active { color: blue }`,
})
export class NavComponent {}
```

Notes :



## Signals - Zoneless

- Enabling Zoneless in your application is still an experimental feature

```ts
import {
  ApplicationConfig,
  // provideZoneChangeDetection,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideZoneChangeDetection({ eventCoalescing: true }),   // <-- Default

    provideExperimentalZonelessChangeDetection(),               // <-- Zoneless
  ],
};
```

- You also need to remove `"zone.js"` and `"zone.js/testing"` in your angular.json configuration file

- Then you can safely uninstall Zone.js by running the command `npm uninstall zone.js`

Notes :


# Appendix (Customization)

<!-- .slide: class="page-title" -->



## Attribute directive - Custom

- To create a custom directive, add the `@Directive` decorator on a class
- `ElementRef` gives you access to the host element
- `Renderer2` let you change the appearance or behavior of the host element

```ts
import { Directive, ElementRef, Renderer2, inject } from '@angular/core';

@Directive({ selector: '[appHighlight]' })
export class HighlightDirective {
  constructor() {
    const elementRef = inject(ElementRef);
    const renderer = inject(Renderer2);

    renderer.listen(elementRef.nativeElement, 'mouseenter', () => {
      renderer.setStyle(elementRef.nativeElement, 'backgroundColor', 'yellow');
    });
    renderer.listen(elementRef.nativeElement, 'mouseleave', () => {
      renderer.setStyle(elementRef.nativeElement, 'backgroundColor', null);
    });
  }
}
```

Notes :

- Specify that we use the native API mainly to allow server-side rendering



## Attribute directive - Usage

- Import the directive `class` in your component
- Use the directive `selector` to attach it to DOM elements in the component template

```ts
import { Component } from '@angular/core';
import { HighlightDirective } from './highlight.directive.ts';

@Component({
  selector: 'app-root',
  imports: [HighlightDirective],
  template: `<p appHighlight> Highlight me! </p>`,
})
export class AppComponent {}
```

- At runtime, if we open the Chrome inspector, we can verify that the style has been correctly applied to the paragraph

```html
<p style="background-color: yellow"> Highlight me! </p>
```

Notes :



## Attribute directive - Host element

- When possible, instead of the `Renderer2`, use the `host` metadata to configure *host binding* and *host listener*

```ts
import { Directive } from '@angular/core';

@Directive ({
  selector: '[appHighlight]',
  host: {
    '[style.backgroundColor]': 'currentColor',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  }
})
export class HighlightDirective {
  currentColor?: string;

  onMouseEnter() { this.currentColor = 'yellow'; }

  onMouseLeave() { this.currentColor = undefined; }
}
```

- Note that `host` property also applies to component metadata

Notes :



## Attribute directive - Input and Output 1/2

- Use `input` and `output` functions to make the directive configurable

```ts
import { Directive, input, output } from '@angular/core';

@Directive ({
  selector: '[appHighlight]',
  host: { /* ...same bindings as previous slide... */ }
})
export class HighlightDirective {
  currentColor?: string;
  highlightColor = input('yellow', { alias: 'appHighlight' });
  highlighted = output<boolean>();

  onMouseEnter() {
    this.currentColor = this.highlightColor();
    this.highlighted.emit(true);
  }
  onMouseLeave() {
    this.currentColor = undefined;
    this.highlighted.emit(false);
  }
}
```

Notes :



## Attribute directive - Input and Output 2/2

- Use regular property binding and event binding on the host element

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <p
      [appHighlight]="highlightColor"
      (highlighted)="highlightedHandler($event)"
    >
      Highlight me!
    </p>
  `,
})
export class AppComponent {
  highlightColor = 'green';

  highlightedHandler(highlighted: boolean) {
    console.log('Is highlighted?', highlighted);
  }
}
```

Notes :



## Directives - Testing

- Create a wrapper component for DOM testing purposes

```ts
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightDirective } from './highlight.directive';

@Component({
  selector: 'app-wrapper',
  imports: [HighlightDirective],
  template: '<div appHighlight>Highlight</div>',
})
class WrapperComponent {}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<WrapperComponent>;
  let hostElement: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [WrapperComponent] }).compileComponents();
    fixture = TestBed.createComponent(WrapperComponent);
    hostElement = fixture.nativeElement.querySelector('[appHighlight]') as HTMLElement;
  });
});
```

Notes :



## Pipes - Custom 1/2

- Can be generated using Angular CLI: `ng generate pipe <pipeName>`
- Use the `@Pipe` decorator on a class
- Class must implement the `PipeTransform` interface (i.e. the `transform` method)

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'joinArray' })
export class JoinArrayPipe implements PipeTransform {
  transform(value: (string | number)[], separator = ' '): string {
    return value.join(separator);
  }
}
```

- Usage example:

```html
<p>List: {{ ['apple', 'orange', 'banana'] | joinArray : ' / ' }}</p>

<!-- List: apple / orange / banana -->
```

Notes :
In fact this pipe does not really work because it needs to be "impure" (this is explained later...).


## Pipes - Custom 2/2

  - JoinArrayPipe should be defined as `impure` because its input is an `Array` that may be mutated

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'joinArray', pure: false }) // <-- Should be impure!
export class JoinArrayPipe implements PipeTransform {
  transform(value: (string | number)[], separator = ' '): string {
    return value.join(separator);
  }
}

@Component({
  selector: 'app-root',
  template: `{{ appList | joinArray }}
    <button (click)=" appList.push('kiwi') ">Mutate</button>`, // <-- Mutation
})
export class AppComponent {
  appList = ['apple', 'orange', 'banana'];
}
```

Notes :



<!-- .slide: class="page-questions" -->

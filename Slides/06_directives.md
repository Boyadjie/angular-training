# Directives

<!-- .slide: class="page-title" -->



## Summary

<!-- .slide: class="toc" -->

- [Getting started](#/1)
- [Workspace](#/2)
- [Technical prerequisites](#/3)
- [Components](#/4)
- [Unit testing](#/5)
- [Control flow](#/6)
- **[Directives](#/7)**
- [Signals](#/8)
- [Services](#/9)
- [Pipes](#/10)
- [Http](#/11)
- [Routing](#/12)
- [Forms](#/13)
- [Appendix](#/14)

Notes :



## Directives

- Live in the **component template**
- Needs a **host element** to be attached to
- Adds **additional behavior** to host elements in your template
- Defined in a single place, it can be used in several components
- Angular offers several **built-in directives** to manage forms, lists, styles, and what users see

Notes :



## Directives

There are 3 types of directives:

- **Attribute directive**: change the appearance or behavior of DOM elements
- **Structural directive**: change the DOM layout by adding and removing DOM elements
- **Component**: yes! components are in fact directives that embed their own template 

Note:
  - Components have already been covered
  - Structural directives are complex and beyond the scope of this training 

✅ Therefore, we'll only cover **attribute directives**

Notes :



## Built-in attr. directives - NgClass 1/2

- The `ngClass` directive adds CSS classes conditionally
- Can be used in addition to the standard class attribute
- Three syntaxes coexist:
  - `[ngClass]=" 'class1 class2' "`
  - `[ngClass]=" ['class1', 'class2'] "`
  - `[ngClass]=" { 'class1': hasClass1, 'class2': hasClass2 } "`

- The last syntax is the most commonly used

Notes :



## Built-in attr. directives - NgClass 2/2

- Example of using the `ngClass` directive

```ts
import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

@Component ({
  selector: 'app-toggle-highlight',
  imports: [NgClass],
  template: `
    <div [ngClass]="{ 'highlight': isHighlighted }">
      {{ isHighlighted ? 'On' : 'Off' }}
    </div>

    <button (click)="isHighlighted = !isHighlighted">Toggle</button>
  `,
  styles: [`
    .highlight { background-color: yellow }
  `]
})
export class ToggleHighlightComponent {
  isHighlighted = false;
}
```

Notes :



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp6" -->

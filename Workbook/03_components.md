## Lab 3: Components (part 1)

In this lab, you're going to experiment the event binding and the property binding

### Creating the "Menu" component

- Create a menu component with the shell command `ng generate component menu` and move the corresponding code into it

- Once done, add the component `<app-menu />` to `src/app/app.html`

- Define a property `isHovered` in the TS file. Set its default value to `false`.

- Define a `(mouseenter)` (event binding) on the `nav` tag. When this event is triggered, it should set `isHovered` to `true`.

- Define a `(mouseleave)` (event binding) on the `nav` tag. When this event is triggered, it should set `isHovered` to `false`.

- Define a class binding (`[class.]`) to add the CSS class `bg-info` when the property `isHovered` is true.

<div class="pb"></div>

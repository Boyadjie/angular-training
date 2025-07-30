## Lab 3: Components (part 1)

In this lab, you're going to experiment the event binding and the property binding

### Updating the "App" component

- Define a property `isHovered` in the TS file. Set its default value to `false`.

- Define a function `toggleIsHovered` in the TS file. This function changes the value of `isHovered`.

- Add 2 event bindings on the `header` tag: `(mouseenter)` and `(mouseleave)`. They both call the `toggleIsHovered` function when they are triggered.

- Define a class binding (`[class.]`) to add the CSS class `bg-info` when the property `isHovered` is true.

<div class="pb"></div>

## Lab 4: Communication between components

In this lab, you'll start creating Angular components to break down the giant `App` component's template into smaller parts

### Creating the "Menu" component

- Create a menu component with the shell command `ng generate component menu` and move the corresponding code into it

- Once done, add the component `<app-menu />` to `src/app/app.html`

<div class="pb"></div>

### Creating the "product" component

- Create a product component with the shell command `ng g c productCard` and move the corresponding code into it

- Use the shell command `ng g i product` in the same directory (`src/app/product/`) and define the product interface:

```ts
export interface Product {
  id: string;
  title: string;
  description: string;
  photo: string;
  price: number;
  stock: number;
}
```

- The component should accept:
  - an input: `product = input.required<Product>();`
  - an output: `addToBasket = output<Product>();`

- Use the properties of the `product` object in the template to display the `title`, `description`, ...

```html
... <a class="card-link">{{ product().title }}</a> ...
```

- The output should emit the product when the user clicks on the button "Ajoutez au panier"


### Storing all products in the `App`

Currently, the products are hard-coded in the template `src/app/app.html`.
Let's give the `App` class, data ownership.

- In `src/app/app.ts`, define a `products: Product[] = [];` property

- Fill the array with the content of the file `Exercises/design/products.json`

- In `src/app/app.html`, use the component `<app-product-card />` instead of each hard-coded product (later in the training, we'll use a "for" loop to achieve this)

```html
<app-product-card [product]="products[0]" />
```

<div class="pb"></div>

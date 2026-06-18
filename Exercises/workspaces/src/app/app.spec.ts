import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { By } from '@angular/platform-browser';
import { ProductCard } from './product-card/product-card';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('It should display the products', () => {
  //   const productElements = fixture.debugElement.queryAll(By.directive(ProductCard));
  //   expect(productElements.length).toBe(4);

  //   productElements.forEach((productElement, index) => {
  //     const productComponent: ProductCard = productElement.componentInstance;
  //     expect(productComponent.product()).toBe(component.products()[index]);
  //   });
  // });

  // it('should update the total when "addToBasket" class method is called', () => {
  //   // Given
  //   component.total.set(99);

  //   // When
  //   component.addToBasket(component.products()[1]);

  //   // Then
  //   expect(component.total()).toBe(99 + component.products()[1].price);
  // });

  // it('should decrease the stock of the product added to the basket', () => {
  //   // Given
  //   const product = component.products()[0];
  //   const initialStock = product.stock;

  //   // When
  //   component.addToBasket(product);

  //   // Then
  //   expect(product.stock).toBe(initialStock - 1);
  // });

  // it('should not display products whose stock is empty', () => {
  //   // Given
  //   let productDebugElements = fixture.debugElement.queryAll(By.directive(ProductCard));
  //   expect(productDebugElements.length).toBe(4);

  //   // When
  //   const updatedProducts = [...component.products()];
  //   updatedProducts[0] = { ...updatedProducts[0], stock: 0 };
  //   component.products.set(updatedProducts);

  //   fixture.detectChanges();

  //   // Then
  //   productDebugElements = fixture.debugElement.queryAll(By.directive(ProductCard));
  //   expect(productDebugElements.length).toBe(3);
  // });

  // it('should display the message "Désolé, notre stock est vide !" when the stock is completely empty', () => {
  //   let element: HTMLElement | null = fixture.nativeElement.querySelector('.empty-stock');
  //   expect(element).toBeNull();

  //   const emptyProducts = component.products().map(product => ({ ...product, stock: 0 }));
  //   component.products.set(emptyProducts);

  //   fixture.detectChanges();

  //   element = fixture.nativeElement.querySelector('.empty-stock');
  //   expect(element?.textContent).toContain('Désolé, notre stock est vide !');
  // });
});

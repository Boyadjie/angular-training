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

  it('It should display the products', () => {
    const productElements = fixture.debugElement.queryAll(By.directive(ProductCard));
    expect(productElements.length).toBe(4);

    productElements.forEach((productElement, index) => {
      const productComponent: ProductCard = productElement.componentInstance;
      expect(productComponent.product()).toBe(component.products[index]);
    });
  });

  it('should update the total when "addToBasket" class method is called', () => {
    // Given
    component.total = 99;

    // When
    component.addToBasket(component.products[1]);

    // Then
    expect(component.total).toBe(99 + component.products[1].price);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { ProductCard } from './product-card';

describe('ProductCard', () => {
  let component: ProductCard;
  let fixture: ComponentFixture<ProductCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('product', {
      id: 'test-id',
      title: 'test title',
      description: 'test description',
      photo: '/assets/test-picture.jpg',
      price: 20,
      stock: 2,
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the product title', () => {
    const titleElement = fixture.nativeElement.querySelector('.card-title');
    expect(titleElement.textContent).toContain('test title');
  });

  it('should display the product description', () => {
    const descriptionElement = fixture.nativeElement.querySelector('.card-header');
    expect(descriptionElement.textContent).toContain('test description');
  });
  
  it('should display the product price', () => {
    const priceElement = fixture.nativeElement.querySelector('.card-text');
    expect(priceElement.textContent).toContain('20 €');
  });

  it('should display the product photo as image url', () => {
    const imageElement = fixture.nativeElement.querySelector('.card-img-top');
    expect(imageElement.src).toContain('/assets/test-picture.jpg');
  });

  it('should emit addToBasket event with the given product when the button is clicked', () => {
    vi.spyOn(component.addToBasket, 'emit');
    const buttonElement = fixture.nativeElement.querySelector('button');
    buttonElement.click();
    expect(component.addToBasket.emit).toHaveBeenCalledWith(component.product());
  });
});

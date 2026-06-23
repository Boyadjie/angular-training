import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { By } from '@angular/platform-browser';
import { BasketService } from './basket/basket.service';
import { BasketServiceStub } from './basket/basket.service.stub';
import { CatalogService } from './catalog/catalog.service';
import { CatalogServiceStub } from './catalog/catalog.service.stub';
import { APP_TITLE } from './app.token';
import { WritableSignal } from '@angular/core';
import { Product } from './product-card/product';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;
  let basketService: BasketService;
  let catalogService: CatalogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: BasketService, useClass: BasketServiceStub },
        { provide: CatalogService, useClass: CatalogServiceStub },
        { provide: APP_TITLE, useValue: 'The App Title' }
      ],
    }).compileComponents();

    basketService = TestBed.inject(BasketService);
    catalogService = TestBed.inject(CatalogService);
    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the app title', () => {
    const appTitle = (fixture.nativeElement.querySelector('h1') as HTMLElement).textContent;
    expect(appTitle).toContain('The App Title');
  });

  it('should display the basket total', () => {
    (basketService.total as WritableSignal<number>).set(99);    
    fixture.detectChanges();

    const header = (fixture.nativeElement as HTMLElement).querySelector('header');
    expect(header?.textContent).toContain(99);
  });

  it('should display the products', () => {
    const productDebugElements = fixture.debugElement.queryAll(By.css('app-product-card'));

    expect(productDebugElements.length).toBe(2);

    productDebugElements.forEach((productDebugElement, index) => {
      expect(productDebugElement.componentInstance.product()).toBe(component.products()[index]);
    });
  });

  it('should call "CatalogService.decreaseStock" and "BasketService.addItem" methods when a product is added to the basket', () => {
    const decreaseStockSpy = vi.spyOn(catalogService, 'decreaseStock');
    const addItemSpy = vi.spyOn(basketService, 'addItem');

    const productDebugElement = fixture.debugElement.query(By.css('app-product-card'));
    productDebugElement.triggerEventHandler('addToBasket', component.products()[0]);

    // Then
    const product = component.products()[0];
    expect(decreaseStockSpy).toHaveBeenCalledWith(product);
    expect(addItemSpy).toHaveBeenCalledWith(product);
  });

  it('should not display products with empty stock', () => {
    // Given
    expect(component.products().length).toBe(3);

    // When/Then
    let productDebugElements = fixture.debugElement.queryAll(By.css('app-product-card'));
    expect(productDebugElements.length).toBe(2); // Note: the third product stock equals 0

    // When
    (catalogService.products as WritableSignal<Product[]>).update(products => {
      products[0].stock = 0;
      return [...products]; // Returns a new array reference to trigger reactivity
    });
    fixture.detectChanges();

    // Then
    productDebugElements = fixture.debugElement.queryAll(By.css('app-product-card'));
    expect(productDebugElements.length).toBe(1);
    expect(productDebugElements[0].componentInstance.product()).toBe(component.products()[1]);
  });

  it('should display the message "Désolé, notre stock est vide !" when the stock is completely empty', () => {
    // Given
    let element: HTMLElement | null = fixture.nativeElement.querySelector('.empty-stock');
    expect(element).toBeNull();

    // When
    (catalogService.hasProductsInStock as WritableSignal<boolean>).set(false);

    
    fixture.detectChanges();

    // Then
    element = fixture.nativeElement.querySelector('.empty-stock');

    expect(element?.textContent).toContain('Désolé, notre stock est vide !');
  });
});

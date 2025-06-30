import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Basket } from './basket';
import { BasketService } from './basket.service';
import { BasketStubService } from './basket.service.stub';
import { CheckoutForm } from './checkout-form/checkout-form';
import { CheckoutReactiveForm } from './checkout-reactive-form/checkout-reactive-form';

describe('Basket', () => {
  let component: Basket;
  let fixture: ComponentFixture<Basket>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Basket],
      providers: [provideRouter([]), { provide: BasketService, useClass: BasketStubService }],
    }).overrideComponent(Basket, {
      remove: {
        imports: [CheckoutForm, CheckoutReactiveForm],
      },
      add: {
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    });

    fixture = TestBed.createComponent(Basket);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

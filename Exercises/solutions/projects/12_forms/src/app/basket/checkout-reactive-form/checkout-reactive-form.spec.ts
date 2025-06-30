import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasketService } from '../basket.service';
import { BasketStubService } from '../basket.service.stub';
import { CheckoutReactiveForm } from './checkout-reactive-form';

describe('CheckoutReactiveForm', () => {
  let component: CheckoutReactiveForm;
  let fixture: ComponentFixture<CheckoutReactiveForm>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CheckoutReactiveForm],
      providers: [
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
        { provide: BasketService, useClass: BasketStubService },
      ],
    });
    fixture = TestBed.createComponent(CheckoutReactiveForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

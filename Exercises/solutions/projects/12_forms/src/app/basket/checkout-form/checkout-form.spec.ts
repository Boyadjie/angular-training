import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasketService } from '../basket.service';
import { BasketStubService } from '../basket.service.stub';
import { CheckoutForm } from './checkout-form';

describe('CheckoutForm', () => {
  let component: CheckoutForm;
  let fixture: ComponentFixture<CheckoutForm>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CheckoutForm],
      providers: [
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
        { provide: BasketService, useClass: BasketStubService },
      ],
    });
    fixture = TestBed.createComponent(CheckoutForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

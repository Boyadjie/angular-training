import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Basket } from './basket';
import { BasketService } from './basket.service';
import { BasketStubService } from './basket.service.stub';

describe('Basket', () => {
  let component: Basket;
  let fixture: ComponentFixture<Basket>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Basket],
      providers: [provideRouter([]), { provide: BasketService, useClass: BasketStubService }],
    });

    fixture = TestBed.createComponent(Basket);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

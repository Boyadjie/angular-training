import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmptyBasket } from './empty-basket';

describe('EmptyBasket', () => {
  let component: EmptyBasket;
  let fixture: ComponentFixture<EmptyBasket>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EmptyBasket],
    });

    fixture = TestBed.createComponent(EmptyBasket);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

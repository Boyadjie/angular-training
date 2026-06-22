import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Menu } from './menu';
import { Basket } from '../basket/basket';
import {BasketStub} from '../basket/basket.stub'
import { BasketItem } from '../basket/basket-item';

describe('Menu', () => {
  let component: Menu;
  let fixture: ComponentFixture<Menu>;
  let basketService: Basket;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Menu],
      providers: [{provide: Basket, useClass: BasketStub}]
    }).compileComponents();

    basketService = TestBed.inject(Basket);
    fixture = TestBed.createComponent(Menu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the number of items', () => {
    let numberOfItems = (fixture.nativeElement as HTMLElement).querySelector('.badge')?.textContent;
    expect(numberOfItems).toContain(0);

    basketService.addItem("test")
    basketService.addItem("test")
    fixture.detectChanges();

    numberOfItems = (fixture.nativeElement as HTMLElement).querySelector('.badge')?.textContent;
    expect(numberOfItems).toContain(2);

  })
});

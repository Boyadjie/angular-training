import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Menu } from './menu';
import { BasketService } from '../basket/basket.service';
import {BasketServiceStub} from '../basket/basket.service.stub'
import { BasketItem } from '../basket/basket-item';

describe('Menu', () => {
  let component: Menu;
  let fixture: ComponentFixture<Menu>;
  let basketService: BasketService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Menu],
      providers: [{provide: BasketService, useClass: BasketServiceStub}]
    }).compileComponents();

    basketService = TestBed.inject(BasketService);
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

import { TestBed } from '@angular/core/testing';

import { Basket } from './basket';
import { BasketItem } from './basket-item';

describe('Basket', () => {
  let service: Basket;
  const mockItem: BasketItem = {
    id: 'mock',
    title: 'mocked basket item',
    price: 42,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Basket);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update the items when a product is added', () => {
    // given
    expect(service.items().length).toBe(0);

    // when
    service.addItem(mockItem);

    // then
    expect(service.items().length).toBe(1);
    expect(service.items()).toContain(mockItem);
  });

  it('should update the total when an item is added', () => {
    expect(service.total()).toBe(0);

    service.addItem(mockItem);
    expect(service.total()).toBe(42);

    service.addItem(mockItem);
    expect(service.total()).toBe(84);
  })
});

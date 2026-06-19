import { TestBed } from '@angular/core/testing';

import { Catalog } from './catalog';

describe('Catalog', () => {
  let service: Catalog;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Catalog);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should decrease the stock', () => {
    // Given
    const product = service.products()[0];
    const initialStock = product.stock;

    // When
    service.decreaseStock(product);

    // Then
    expect(service.products()[0].stock).toBe(initialStock - 1);
  });

  it("should not decrease the product stock when it's empty", () => {
    const product = service.products()[0];
    expect(service.products()[0].stock).toBe(2);

    service.decreaseStock(product);
    expect(service.products()[0].stock).toBe(1);

    service.decreaseStock(product);
    expect(service.products()[0].stock).toBe(0);

    service.decreaseStock(product);
    expect(service.products()[0].stock).toBe(0);
  });
});

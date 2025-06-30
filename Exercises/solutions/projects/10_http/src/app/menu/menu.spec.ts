import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasketService } from '../basket/basket.service';
import { BasketStubService } from '../basket/basket.service.stub';
import { BasketItem } from '../basket/basket.types';
import { Menu } from './menu';

describe('Menu', () => {
  let component: Menu;
  let fixture: ComponentFixture<Menu>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Menu],
      providers: [{ provide: BasketService, useClass: BasketStubService }],
    });
    fixture = TestBed.createComponent(Menu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the number of items', () => {
    // Given
    let numberOfItems = (fixture.nativeElement as HTMLElement).querySelector('.badge')?.textContent;
    expect(numberOfItems).toContain(0);

    // When
    (TestBed.inject(BasketService) as unknown as BasketStubService).items.set([{} as BasketItem, {} as BasketItem]);
    fixture.detectChanges();

    // Then
    numberOfItems = (fixture.nativeElement as HTMLElement).querySelector('.badge')?.textContent;
    expect(numberOfItems).toContain(2);
  });
});

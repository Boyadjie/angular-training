import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product-card/product';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe, UpperCasePipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  private activatedRoute = inject(ActivatedRoute);
  private httpClient = inject(HttpClient);

  protected product = signal<Product | undefined>(undefined);
  protected hasError = signal(false);
  
  constructor() {
    const productId = this.activatedRoute.snapshot.params['id'];

    this.httpClient.get<Product>(`http://localhost:8080/api/products/${productId}`).subscribe({
      next: (product) => this.product.set(product),
      error: () => this.hasError.set(true),
    });
  }
}

export default ProductDetails;


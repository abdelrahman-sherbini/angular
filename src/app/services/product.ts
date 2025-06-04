import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../model/ApiResponse';
import {map} from 'rxjs';
import {DummyJsonProductsResponse} from '../model/ProductResponse';
import {CategoryResponse} from '../model/CategoryResponse';
import {CategoryModel} from '../model/CategoryModel';
import {ProductModel} from '../model/ProductModel';
import {ProductDetailModel} from '../model/ProductDetailModel';

@Injectable({
  providedIn: 'root'
})
export class Product {
  private baseUrl = 'https://dummyjson.com';
  constructor(private http: HttpClient) {

  }
  getProducts(limit: number = 10, skip: number = 0) {
    return this.http.get<ApiResponse>(`${this.baseUrl}/products`)
      .pipe(
        map(response => {
          return {
            data: response.products,
            total: response.total,
            skip: response.skip,
            limit: response.limit,
            success: true,
            message: 'Products fetched successfully'
          };
        })
      );
  }
  getCategories() {
    return this.http.get<CategoryModel[]>(`${this.baseUrl}/products/categories`).pipe(
      map(response => {
        return {
          data: response,
          success: true,
          message: 'Categories fetched successfully'
        };
      }));
  }

  getProductById(id: number) {
    return this.http.get<ProductDetailModel>(`${this.baseUrl}/products/${id}`)
      .pipe(
        map(response => {
          return {
            id: response.id,
            title: response.title,
            description: response.description,
            price: response.price,
            discountPercentage: response.discountPercentage,
            rating: response.rating,
            stock: response.stock,
            brand: response.brand,
            category: response.category
          };
        })
      );

  }
}

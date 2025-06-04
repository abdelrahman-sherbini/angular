import {Component, NgModule, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormGroup,FormBuilder, FormsModule,ReactiveFormsModule} from '@angular/forms';
import {Product} from '../../services/product';
import {ProductModel} from '../../model/ProductModel';
import {CategoryModel} from '../../model/CategoryModel';
import {ProductCard} from '../product-card/product-card';
import {ProductFilterPipe} from '../../pipes/produc-filter-pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, ProductCard, ReactiveFormsModule, ProductFilterPipe
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  public id: number = 0;
  public title: string = 'Sample Product Title';
  public stock: number = 100;
  public category: string = 'Sample Category';
  public price: number = 99.99;


  public filterForm: FormGroup;
  public categories: CategoryModel[] = [];
  public products: ProductModel[] = [];
  public total: number = 0;
  constructor(private _productService: Product,private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      title: [''],
      price: [''],
      category: ['']
    });

  }
  ngOnInit() {
    this._productService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        this.total = response.total;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    })
    this._productService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  resetFilters() {
    this.filterForm.reset();
  }

}

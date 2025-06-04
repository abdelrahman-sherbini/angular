import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductModel } from '../model/ProductModel';
import {ProductDetailModel} from './ProductDetailModel';

export interface CartItem {
  product: ProductDetailModel;
  quantity: number;
}

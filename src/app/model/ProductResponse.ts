import {ProductModel} from './ProductModel';

export interface DummyJsonProductsResponse {
  products: ProductModel[];
  total: number;
  skip: number;
  limit: number;
}

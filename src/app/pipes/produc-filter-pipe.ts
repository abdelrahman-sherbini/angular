import { Pipe, PipeTransform } from '@angular/core';
import {ProductModel} from '../model/ProductModel';
import {ProductDetailModel} from '../model/ProductDetailModel';

@Pipe({
  name: 'productFilter',
  standalone: true // if using standalone
})
export class ProductFilterPipe implements PipeTransform {
  transform(products: ProductDetailModel[], filters: any): ProductDetailModel[] {
    if (!products) return [];
    const { title, price, category } = filters;
    console.log('Filter category:', category);
    console.log('Product category example:', products[0]?.category);
    return products.filter(p => {
      return (
        (!title || p.title?.toLowerCase().includes(title.toLowerCase())) &&
        (!price || (p.price ?? 0) <= price) &&
        (!category || p.category?.trim().toLowerCase() === category.trim().toLowerCase())
      );
    });
  }
}

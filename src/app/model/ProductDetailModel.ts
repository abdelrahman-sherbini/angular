import {ReviewModel} from './reviewModel';

export class ProductDetailModel{
  id: number=0;
  title: string="";
  description: string="";
  category: string="";
  price: number = 0;
  discountPercentage: number = 0;
  rating: number = 0;
  stock: number = 0;
  brand?: string;
  reviews?: ReviewModel[]; // Optional field for reviews

}

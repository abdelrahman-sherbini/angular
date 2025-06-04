import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {CartComponent} from './cart/cart.component';

const routes: Routes = [
  {
    path : '',
    component:ProductsComponent
  },
  {
    path : ':productId',
    component:ProductDetailsComponent

  },

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ]
})
export class ProductModule { }

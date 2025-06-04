import { Routes } from '@angular/router';
import {LayoutComponent} from './shared/layout/layout.component';
import {HomeComponent} from './components/home/home.component';
import {CategoriesComponent} from './components/categories/categories.component';
import {AboutComponent} from './components/about/about.component';
import {CartComponent} from './product/cart/cart.component';


export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'products',
    loadChildren: () => import('./product/product-module').then(m => m.ProductModule)
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path : 'cart',
    component:CartComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

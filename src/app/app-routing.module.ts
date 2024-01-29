import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProductsComponent} from "./products/products.component";
import {NewProductComponent} from "./new-product/new-product.component";
import {UpdateProductComponent} from "./update-product/update-product.component";

const routes: Routes = [
  {path : "home", component : HomeComponent},
  {path : "products", component : ProductsComponent},
  {path : "newProduct", component : NewProductComponent},
  {path : "updateProduct/:id", component : UpdateProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

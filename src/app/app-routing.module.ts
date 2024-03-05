import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProductsComponent} from "./products/products.component";
import {NewProductComponent} from "./new-product/new-product.component";
import {UpdateProductComponent} from "./update-product/update-product.component";
import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";

const routes: Routes = [
  {path : "login", component : LoginComponent},
  {
    path : "admin", component : AdminTemplateComponent, children :[
      {path : "home", component : HomeComponent},
      {path : "products", component : ProductsComponent},
      {path : "newProduct", component : NewProductComponent}
    ]
  },
  {path : "updateProduct/:id", component : UpdateProductComponent},
  {path : "", redirectTo : "login", pathMatch : "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

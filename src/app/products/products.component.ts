import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products : Array<Product> = [];
  constructor(private productService : ProductService) {
  }

  ngOnInit(){
        this.productService.getProducts().subscribe({
          next : data => this.products=data,
          error : err => console.log(err)
        })
    }


  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product)
      .subscribe({
        next : updatedProduct =>{
          product.checked=!product.checked;
        }
      })
  }
}

import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";
import {Router, RouterOutlet} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  constructor(private productService : ProductService,
              private router : Router,
              public appState : AppStateService) {
  }

  ngOnInit(){
     this.getProducts();
    }
    getProducts(){
      this.productService.searchProducts(this.appState.productsState.keyword,
        this.appState.productsState.currentPage,
        this.appState.productsState.pageSize).subscribe({
        next : (response) => {
          let products=response.body as Product[];
          let totalProducts : number=parseInt(response.headers.get(`X-Total-Count`)!);
          //let totalProducts=totalProduct;
          let totalPages=Math.floor(totalProducts/this.appState.productsState.pageSize);
          if (totalProducts % this.appState.productsState.pageSize != 0){
            totalPages++;
          }
          this.appState.setProductState({
            products : products,
            totalProducts : totalProducts,
            totalPages : totalPages
          })
        },
        error : err => console.log(err)
      })
      //this.products=this.productService.getProducts();
    }


  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product)
      .subscribe({
        next : updatedProduct =>{
          product.checked=!product.checked;
        }
      })
  }

  deleteProduct(product: Product) {
    if (confirm("Etes vous Sûre?"))
    this.productService.deleteProduct(product).subscribe({
      next : value => {
        //this.getProducts();
        this.appState.productsState.products=this.appState.productsState.products.filter((p:any)=>p.id!=product.id);
      }
    });
  }


  goToPage(page: number) {
    this.appState.productsState.currentPage=page;
    this.getProducts();
  }

  updateProduct(product: Product) {
    this.router.navigateByUrl(`updateProduct/${product.id}`);
  }
}

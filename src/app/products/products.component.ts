import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  public products : Array<Product>=[];
  public keyword : string="";
  totalPages : number=0;
  pageSize : number=4
  currentPage : number=1;
  constructor(private productService : ProductService) {
  }

  ngOnInit(){
     this.getProducts();
    }
    getProducts(){
      this.productService.getProducts(this.currentPage,this.pageSize).subscribe({
        next : (response) => {
          this.products=response.body as Product[];
          let totalProduct : number=parseInt(response.headers.get(`X-Total-Count`)!);
          this.totalPages=Math.floor(totalProduct/this.pageSize);
          if (totalProduct % this.pageSize != 0){
            this.totalPages++;
          }
          console.log(this.totalPages)
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
        this.products=this.products.filter(p=>p.id!=product.id);
      }
    });
  }

  searchProducts() {
    this.productService.searchProduct(this.keyword).subscribe({
      next : value => this.products=value
    })
  }

  goToPage(page: number) {
    this.currentPage=page;
    this.getProducts();
  }
}

import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../model/product.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit{
  productId! :number;
  productFormGroup! : FormGroup;
  constructor(private productService:ProductService,
              private route:ActivatedRoute,
              private formBuilder:FormBuilder) {
  }
    ngOnInit() {
    this.productId=this.route.snapshot.params['id'];
    this.productService.getProductByID(this.productId).subscribe({
      next:(product) =>{
        this.productFormGroup=this.formBuilder.group({
          id:this.formBuilder.control(product.id),
          name:this.formBuilder.control(product.name,[Validators.required]),
          prix:this.formBuilder.control(product.prix,[Validators.min(100)]),
          checked:this.formBuilder.control(product.checked)
        })
      },
      error : err => console.log(err)
    });
    }


  updateProduct() {
    let product:Product=this.productFormGroup.value;
    this.productService.updateProduct(product).subscribe({
      next:value => {
        alert(JSON.stringify(value));
      },error : err => console.log(err)
    });
  }
}

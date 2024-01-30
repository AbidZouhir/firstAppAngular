import { Injectable } from '@angular/core';
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  public productsState:any ={
    products :[],
    keyword : "",
    totalPages : 0,
    pageSize : 4,
    currentPage : 1,
    totalProducts : 0
  }
  constructor() { }
  public setProductState(state : any){
    this.productsState={...this.productsState,...state}
  }
}

import { Component } from '@angular/core';
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  actions : Array<any> = [
    {title : "home",route:"/home", icon : "house"},
    {title : "products",route:"/products", icon : "search"},
    {title : "New Product",route:"/newProduct", icon : "safe"}
  ];
  currentAction : any ;

  constructor(public appStateService : AppStateService) {
  }
  setCurrentAction(action: any) {
    this.currentAction=action;
  }

}

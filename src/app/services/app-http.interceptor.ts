import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from "@angular/core";
import {AppStateService} from "./app-state.service";
import {finalize} from "rxjs";
import {LoadingService} from "./loading.service";

export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const appStat : AppStateService = inject(AppStateService);
  const loadingService:LoadingService=inject(LoadingService);
  /*appStat.setProductState({
    status : "LOADING"
  })*/
  loadingService.showLoadingSpinner();
  let request=req.clone({
    headers : req.headers.set("Authorization","Bearer JWT")
  });
  return next(request).pipe(
    finalize(()=>{
      /*appStat.setProductState({
        status : "LOADED"
      })*/
      loadingService.hideLoadingSpinner();
    })
  );
};


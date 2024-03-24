import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../../services/loading/loading.service';
import { finalize } from 'rxjs';

export const LoadingInterceptor: HttpInterceptorFn = (req, next) => {

  const loadingService = inject(LoadingService);
  loadingService.showLoading();
  
  return next(req).pipe(
    finalize(() => {
      loadingService.hideLoading();
    })
  );
};

import { Component, inject } from '@angular/core';
import { LoadingService } from '../../../services/loading/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  isLoading !: boolean;
  loadingService = inject(LoadingService)

  constructor() {
    this.loadingService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }
}

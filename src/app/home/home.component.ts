import { Component, inject } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { Food } from '../shared/models/Food.model';
import { StarRatingModule } from 'angular-star-rating';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [StarRatingModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  foods: Food[] = []

  // # for private modifier
  foodService = inject(FoodService);

  ngOnInit(): void {
    this.foods = this.foodService.getAll();
  }
  
}

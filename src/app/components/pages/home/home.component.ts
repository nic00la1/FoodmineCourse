import { Component, inject } from '@angular/core';
import { FoodService } from '../../../services/food/food.service';
import { Food } from '../../../shared/models/Food.model';
import { StarRatingComponent } from '../../partials/star-rating/star-rating.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [StarRatingComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  foods: Food[] = []

  // # for private modifier
  foodService = inject(FoodService);
  route = inject(ActivatedRoute);
  
  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      if (params['searchTerm'])
        this.foods = this.foodService.getAll().filter(food => 
          food.name.toLowerCase().includes(params['searchTerm'].toLowerCase()));
      else
        this.foods = this.foodService.getAll();
    
    })
  }

}

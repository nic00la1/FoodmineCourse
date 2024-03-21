import { Component, inject } from '@angular/core';
import { Food } from '../../../shared/models/Food.model';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../../../services/food/food.service';
import { StarRatingComponent } from '../../partials/star-rating/star-rating.component';
import { TagsComponent } from '../../partials/tags/tags.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-food-page',
  standalone: true,
  imports: [StarRatingComponent, TagsComponent, CommonModule],
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.css'
})
export class FoodPageComponent {
  food !: Food;

  activatedRoute = inject(ActivatedRoute);
  foodService = inject(FoodService);

  constructor() { // get food by id
    this.activatedRoute.params.subscribe((params) => {
      if (params['id'])
        this.food = this.foodService.getFoodById(params['id']);
    })
  }
 

  ngOnInit(): void {
    // get food by id
  }
}

import { Component, inject } from '@angular/core';
import { FoodService } from '../../../services/food/food.service';
import { Food } from '../../../shared/models/Food.model';
import { StarRatingComponent } from '../../partials/star-rating/star-rating.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SearchComponent } from '../../partials/search/search.component';
import { TagsComponent } from '../../partials/tags/tags.component';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [StarRatingComponent, CommonModule, RouterModule, SearchComponent, TagsComponent, NotFoundComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  foods: Food[] = []

  // # for private modifier
  foodService = inject(FoodService);
  activatedRoute = inject(ActivatedRoute);

  constructor() {
    let foodsObservable : Observable<Food[]>;
    this.activatedRoute.params.subscribe((params) => {
      if (params['searchTerm'])
        foodsObservable = this.foodService.getAllFoodsBySearchTerm(params['searchTerm']);
      else if (params['tag'])
        foodsObservable = this.foodService.getAllFoodsByTag(params['tag']);
      else
        foodsObservable = this.foodService.getAll();

        foodsObservable.subscribe((serverFoods) => {
          this.foods = serverFoods;
        })
    })
  }
  

}

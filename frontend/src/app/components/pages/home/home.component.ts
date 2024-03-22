import { Component, inject } from '@angular/core';
import { FoodService } from '../../../services/food/food.service';
import { Food } from '../../../shared/models/Food.model';
import { StarRatingComponent } from '../../partials/star-rating/star-rating.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SearchComponent } from '../../partials/search/search.component';
import { TagsComponent } from '../../partials/tags/tags.component';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';

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
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      if (params['searchTerm']){ 
        this.foods = this.foodService.getAllFoodsBySearchTerm(params['searchTerm']); // get foods by search term
      }
      else if (params['tag']) {
        this.foods = this.foodService.getAllFoodsByTag(params['tag']); // get foods by tag
      }
      else 
        this.foods = this.foodService.getAll(); // get all foods
    
    })
  }

}
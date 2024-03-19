import { Component, inject } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { OnInit } from '@angular/core';
import { Food } from '../shared/models/Food.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
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

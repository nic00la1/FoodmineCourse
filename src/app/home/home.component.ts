import { Component, inject } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  foods: String[] = []

  // # for private modifier
  foodService = inject(FoodService);

  ngOnInit(): void {
    this.foods = this.foodService.getAll();
  }
  
}

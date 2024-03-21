import { Component, inject } from '@angular/core';
import { Tag } from '../../../shared/models/Tag.model';
import { RouterModule } from '@angular/router';
import { FoodService } from '../../../services/food/food.service';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent {
  tags: Tag[] = []

  foodService = inject(FoodService)

  ngOnInit() {
    this.tags = this.foodService.getAllTags()
  }

}

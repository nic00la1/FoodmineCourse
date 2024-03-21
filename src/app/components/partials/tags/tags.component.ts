import { Component, Input, inject } from '@angular/core';
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

  @Input()
  foodPageTags ?: string[]; 
  tags?: Tag[];

  foodService = inject(FoodService)

  ngOnInit() {
    if(!this.foodPageTags) 
    this.tags = this.foodService.getAllTags()
  }

}

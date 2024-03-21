import { Injectable } from '@angular/core';
import { Food } from '../../shared/models/Food.model';
import { Tag } from '../../shared/models/Tag.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll() : Food[] 
  {
    return [
      {
        id: 1,
        name: 'Pizza Pepperoni',
        price: 10,
        tags: ['FastFood', 'Pizza', 'Lunch'],
        favorite: false,
        stars: 4.5,
        imageUrl: 'assets/images/foods/food-1.jpg',
        origins: ['italy'],
        cookTime: '10-20'
      },
      {
        id: 2,
        name: 'Beef Meatball',
        price: 20,
        tags: ['Lunch','SlowFood'],
        favorite: true,
        stars: 4.7,
        imageUrl: 'assets/images/foods/food-2.jpg',
        origins: ['persia', 'middle east' ,'china'],
        cookTime: '20-30'
      },
      {
        id: 3,
        name: 'Hamburger',
        price: 5,
        tags: ['FastFood', 'Hamburger'],
        favorite: false,
        stars: 3.5,
        imageUrl: 'assets/images/foods/food-3.jpg',
        origins: ['germany', 'us'],
        cookTime: '10-15'
      },
      {
        id: 4,
        name: 'Fried Potatoes',
        price: 2,
        tags: ['FastFood', 'Fry'],
        favorite: true,
        stars: 3.3,
        imageUrl: 'assets/images/foods/food-4.jpg',
        origins: ['belgium', 'france'],
        cookTime: '15-20'
      },
      {
        id: 5,
        name: 'Chicken Soup',
        price: 11,
        tags: ['Soup', 'SlowFood'],
        favorite: false,
        stars: 5.0,
        imageUrl: 'assets/images/foods/food-5.jpg',
        origins: ['poland', 'asia'],
        cookTime: '40-50'
      },
      {
        id: 6,
        name: 'Vegetables Pizza',
        price: 9,
        tags: ['FastFood', 'Pizza', 'Lunch'],
        favorite: false,
        stars: 4.0,
        imageUrl: 'assets/images/foods/food-6.jpg',
        origins: ['italy'],
        cookTime: '40-50'
      },
    ]
  }

  getAllTags() : Tag[] 
  {
    return [
      {name: 'All', count: 14},
      {name: 'FastFood', count: 4},
      {name: 'Pizza', count: 2},
      {name: 'Lunch', count: 3},
      {name: 'SlowFood', count: 2},
      {name: 'Hamburger', count: 1},
      {name: 'Fry', count: 1},
      {name: 'Soup', count: 1}
    ]
  }

  getAllFoodsByTag(tag: string) : Food[] {
    return tag == "All" ?
      this.getAll() : 
      this.getAll().filter(food => food.tags.includes(tag));
  }

  getAllFoodsBySearchTerm(searchTerm: string) : Food[] {
    return this.getAll().filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  getFoodById(id: number) : Food {
    return this.getAll().find(food => food.id == id) as Food;
  }
}

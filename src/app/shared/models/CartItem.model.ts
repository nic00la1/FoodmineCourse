import { Food } from "./Food.model";

export class CartItem {
    constructor(food: Food) {
        this.food = food;
    }
   public food: Food;
   public quantity: number = 1

   get price() : number {
    return this.food.price * this.quantity;
   }
   
}
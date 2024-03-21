import { CartItem } from "./CartItem.model";

export class Cart {
    constructor(
        public items : CartItem[] = []
    ) {}

    get totalPrice() : number {
        let totalPrice = 0;
        this.items.forEach(item => {
            totalPrice += item.price;
        });

        return totalPrice;
    }

}
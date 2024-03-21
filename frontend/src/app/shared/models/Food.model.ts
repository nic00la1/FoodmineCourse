export class Food {
    constructor(
        public id:number,
        public name: string,
        public price: number,
        public tags: string[],
        public favorite: boolean = false,
        public stars: number = 0,
        public imageUrl: string,
        public origins: string[],
        public cookTime: string
    ) {}
}
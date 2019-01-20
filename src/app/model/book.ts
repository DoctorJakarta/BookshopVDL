import { Tag } from './tag';
import { Reference } from './reference';

// This is globally accessible with "reviewStatus.EDIT" after this.reviewStatus = ReviewStatus
export enum SALE_STATUS {
  // The values enum NAME is passed into the JSON request, and the java enum name is returned as a string.  T
  KEEP = "KEEP",
  SHELF = "SHELF",
  STORE = "STORE",
  HOLD = "HOLD",
  SOLD = "SOLD"
}
// This is accessible with "fruitNames.get(fruit.APPLE)" after this.fruitNames = Fruit.getFruitNames()
const SaleStatusNames = new Map<string, string>([
  // These are the display Names
  [SALE_STATUS.KEEP, 'Keeper'],
  [SALE_STATUS.SHELF, 'On Shelf'],
  [SALE_STATUS.STORE, 'In Store'],
  [SALE_STATUS.HOLD, 'Being Held'],
  [SALE_STATUS.SOLD, 'Sold']
]);

export class Book {
    public id: number;
    public title: string;
    public author: string;
 
    public year: number;
    public desc: string;
    public comment: string;

    public price: number;
    public priceBought: number;
    public priceMin: number;
    public priceMax: number;

    public dateBought: string;
    public dateSold: string;

    public status = SALE_STATUS.SHELF;

    public references: Reference[];
    public tags: Tag[];

    public static getSaleStatusNames() { return SaleStatusNames; }
}

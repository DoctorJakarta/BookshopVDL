import { Tag } from './tag';
import { Reference } from './reference';

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

    public sold = false;

    public references: Reference[];
    public tags: Tag[];

}

import { Detail } from './detail';

export enum ATTR {
    CONDITION='Condition'
}

export class Attribute {
    public id: number;
    public name: string;
    public details: Detail[];

}

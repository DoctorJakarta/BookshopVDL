import { Detail } from './detail';

export enum ATTR {
    BINDING='Binding',
    CONDITION='Condition',
    SIZE='Size'
}

export class Attribute {
    public id: number;
    public name: string;
    public details: Detail[];

}

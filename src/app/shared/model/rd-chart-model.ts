export interface Item {
    double: number;
    // float: number;
    // int: number;
    // long: number;
    // string: string;
    // arrayofdouble: Array<number>;
    // boolean: boolean;
    // bytes: string;
}

 export interface DataValue {
    item: Item;
}

export interface DataItem {
    indexes: number[];
    channelId: number;
    value: DataValue;
    valueAttributes: DataAttribute[];
}
 export interface DataAttribute{
    attribute: string;

 }
 
declare namespace API {
    export type Portfolio = {
        id: string;
        positions: Position[];
    }

    export type Position = {
        id: number;
        asset: string;
        quantity: number;
        asOf: string; 
        price: number;
    }
}
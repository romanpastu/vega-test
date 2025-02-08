declare namespace API {
    export type AssetType = 'stock' | 'crypto' | 'fiat';
    
    export type Asset = {
        id: string;
        name: string;
        type: AssetType;
    }
}
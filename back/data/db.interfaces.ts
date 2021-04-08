export interface IPlayer {
    id?: number;
    username: string;
    result_id?: number;
}

export interface IResult {
    id?: number;
    location: string;
    time: Date;
    score: number;
    proof: string;
    variant_id?: number;
}

export interface IVariant {
    id?: number;
    name: string;
    league: "M" | "W" | "A";
    description: string;    
}
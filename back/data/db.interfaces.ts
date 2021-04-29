export interface IPlayerDbModel {
    id?: number;
    username: string;
}

export interface IResultDbModel {
    id?: number;
    location: string;
    time: Date;
    score: number;
    proof: string;
    variant_id?: number;
}

export interface IPlayersResultsDbModel {
    player_id: number;
    result_id: number;
}

export interface IVariantDbModel {
    id?: number;
    name: string;
    league: "M" | "W" | "A";
    description: string;    
}
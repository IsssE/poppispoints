export interface IDbPlayerModel {
    id?: number;
    username: string;
}

export interface IDbResultModel {
    id?: number;
    location: string;
    time: Date;
    score: number;
    proof: string;
    variant_id?: number;
}

export interface IDbPlayersResultsModel {
    player_id: number;
    result_id: number;
}

export interface IDbVariantModel {
    id?: number;
    name: string;
    league: "M" | "W" | "A";
    description: string;    
}
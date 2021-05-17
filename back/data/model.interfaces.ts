export interface IPlayerResults {
    player: string;
    location: string;
    time: Date;
    score: number;
    proof: string;
}
export interface IPlayerResultsWithVariant extends IPlayerResults {
    variant: IVariant;
}

interface IVariant {
    name: string;
    league: "M" | "W" | "A";
    description: string;
}

export interface IVariantInfo {
    name: string
}
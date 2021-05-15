export interface IPlayerResults {
    //resultId?: number;
    location: string;
    time: Date;
    score: number;
    proof: string;
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
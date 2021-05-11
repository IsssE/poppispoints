export interface IPlayerResults {
    //resultId?: number;
    location: string;
    time: Date;
    score: number;
    proof: string;
    variant: number | IVariant;
}

interface IVariant {
    name: string;
    league: "M" | "W" | "A";
    description: string;
}
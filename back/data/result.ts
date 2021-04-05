import { getDb } from "../data/db"

export interface IResult {
    id: number;
    location: string;
    time: Date;
    score: number;
    proof: string;
    variant: number;
}

export const getResultsAll = () => {
    const db = getDb();
    console.log("is db null", db)
}

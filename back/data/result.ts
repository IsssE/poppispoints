import { getDb } from "../data/db"
import { IData } from "./csv_parser";

interface IResult {
    id: number;
    location: string;
    time: Date;
    score: number;
    proof: string;
    variant: number;
}
export const insertResult = (name: string, result: IData) => {
    const db = getDb();

}

export const getResultsAll = () => {
    console.log("getResultsAll")
    const db = getDb();
    console.log("is db null", db)
}

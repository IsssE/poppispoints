import { IResult } from "./result";
import { getDb } from "../data/db"

interface IPlayer {
    id: number,
    username: string;
    result: readonly IResult[];
}
export const getPlayerData = () => {

}

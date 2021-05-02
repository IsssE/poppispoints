import db, {tables} from "./db"; // importing the db config
import { IDbPlayerModel, IDbPlayersResultsModel, IDbResultModel } from "./db.interfaces"
/* 
interface IPlayer {
    id: number,
    username: string;
    result: readonly IResult[];
    
}*/
export const insertPlayerData = async (player: IDbPlayerModel): Promise<number> => {
    let result = null;
    if (!player.id) {
        const val = await db<IDbPlayerModel>(tables.PLAYERS).insert(player, 'id')
        result = val[0];
    }

    return result;
}

export const linkPlayersResult = async (players: number[], result: number) => {
    if (!players.find(x => !x) || !result) {
        throw "Linking models without id!";
    }
    const values = players.map<IDbPlayersResultsModel>(x => {
        return { player_id: x, result_id: result }
    })

    db<IDbPlayersResultsModel>(tables.PLAYERS_RESULTS).insert(values)
}

export const getPlayerScores = async (playerId: number): Promise<IDbResultModel[]> => {
    const allPlayerScores = await db<IDbResultModel>(tables.RESULTS)
    .whereIn('id', db<IDbPlayersResultsModel>(tables.PLAYERS_RESULTS)
    .select('result_id').where('player_id', playerId))

    return allPlayerScores;
}
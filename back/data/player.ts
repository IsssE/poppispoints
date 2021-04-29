import db from "./db"; // importing the db config
import { IPlayerDbModel, IPlayersResultsDbModel, IResultDbModel } from "./db.interfaces"
/* 
interface IPlayer {
    id: number,
    username: string;
    result: readonly IResult[];
    
}*/
export const insertPlayerData = async (player: IPlayerDbModel): Promise<number> => {
    let result = null;
    if (!player.id) {
        const val = await db<IPlayerDbModel>('players').insert(player, 'id')
        result = val[0];
    }

    return result;
}

export const linkPlayersResult = async (players: number[], result: number) => {
    if (!players.find(x => !x) || !result) {
        throw "Linking models without id!";
    }
    const values = players.map<IPlayersResultsDbModel>(x => {
        return { player_id: x, result_id: result }
    })

    db<IPlayersResultsDbModel>('players_results').insert(values)
}
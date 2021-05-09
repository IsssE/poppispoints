import db, { tables } from "./db"; // importing the db config
import { IDbPlayerModel, IDbPlayersResultsModel } from "./db.interfaces"
/* 
interface IPlayer {
    id: number,
    username: string;
    result: readonly IResult[];
    
}*/
export const insertPlayerData = async (player: IDbPlayerModel): Promise<number | null> => {
    let result = null;
    if (player.username) {
        const val = await db<IDbPlayerModel>(tables.PLAYERS).insert(player, 'id')
        if (val[0]) {
            result = val[0];
        }
    }

    return result;
}

export const linkPlayersResult = async (players: number[], result: number) => {
    if (players.find(x => !x) || !result) {
        throw new Error("Linking models without id!");
    }
    const values = players.map<IDbPlayersResultsModel>(x => {
        return { player_id: x, result_id: result }
    })
    
    db<IDbPlayersResultsModel>(tables.PLAYERS_RESULTS).insert(values).
    then((x) => {
        console.debug("Values inserted correctly", values)
    }).catch(e => {
        throw new Error(e)
    })
}

// TODO: check the type whenever this works
// Now just womits all data, might wanna clean the select parameters
export const getPlayerScores = async (username: string): Promise<any[]> => {
    return db.select(/*`${tables.PLAYERS}.*`,*/`${tables.RESULTS}.*` )
    .from(tables.RESULTS)
    .leftJoin(tables.PLAYERS_RESULTS, `${tables.PLAYERS_RESULTS}.player_id`,`${tables.PLAYERS}.id`)
    .leftJoin(tables.PLAYERS, `${tables.PLAYERS_RESULTS}.result_id`, `${tables.RESULTS}.id`)
    .where(`${tables.PLAYERS}.username`, username)
    .then(results => {
        return results;
    })

}
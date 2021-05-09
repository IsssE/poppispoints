import db, { tables } from "./db"; // importing the db config
import { IDbResultModel } from "./db.interfaces"

export const inserResult = async (result: IDbResultModel): Promise<number> => {
    // do this https://alexzywiak.github.io/knex-bag-o-functions-modeling-many-to-many-relationships-in-node-2/index.html
    // siims okay
    if (!result.id) {
        const val = await db<IDbResultModel>(tables.RESULTS).insert(result, 'id')
        if (val && val[0]) {
            return val[0]
        }
    }
    throw new Error("error in inserting player data");
}


// TODO: Link players who done the score
export const getAllScores = async (): Promise<IDbResultModel[]> => {
    return await db<IDbResultModel>(tables.RESULTS).select('*');
}

// TODO: Link players who done the score
export const getAllVariantScores = async (variant: number): Promise<IDbResultModel[]> => {
    const result = await db<IDbResultModel>(tables.RESULTS).where('variant_id', variant).select('*')

    /*

        const result = await db<IDbResultModel>(tables.RESULTS)
        .whereIn('id', db<IDbPlayersResultsModel>(tables.PLAYERS_RESULTS)
            .select('result_id').where('player_id', playerId))


    */
    return result;
}
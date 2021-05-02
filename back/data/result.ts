import db, { tables } from "./db"; // importing the db config
import { IDbResultModel } from "./db.interfaces"

export const inserResult = async (result: IDbResultModel): Promise<number> => {
    // do this https://alexzywiak.github.io/knex-bag-o-functions-modeling-many-to-many-relationships-in-node-2/index.html
    // siims okay
    if (!result.id) {
        const val = await db<IDbResultModel>(tables.RESULTS).insert(result, 'id')
        if (val) {
            return val[0]
        }
    }
    throw "error in inserting player data";
}

export const getAllScores = async (): Promise<IDbResultModel[]> => {
    return await db<IDbResultModel>(tables.RESULTS).select('*');
}

export const getAllVariantScores = async (variant: number): Promise<IDbResultModel[]> => {
    const result = await db<IDbResultModel>(tables.RESULTS).where('variant_id', variant).select('*')
    return result;
}
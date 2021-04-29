import db from "./db"; // importing the db config
import { IResultDbModel } from "./db.interfaces"

export const inserResult = async (result: IResultDbModel): Promise<number> => {
    // do this https://alexzywiak.github.io/knex-bag-o-functions-modeling-many-to-many-relationships-in-node-2/index.html
    // siims okay
    if (!result.id) {
        const val = await db<IResultDbModel>('players').insert(result, 'id')
        if (val) {
            return val[0]
        }
    }
    throw "error in inserting player data";
}

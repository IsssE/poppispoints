import db, { tables } from "./db"; // importing the db config
import { IDbResultModel } from "./db.interfaces"
import { IPlayerResults } from "./model.interfaces";

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
export const getVariantScores = async (variant: number): Promise<Record<string, IPlayerResults[]>> => {
    let variantData: Record<string, IPlayerResults[]> = {};
    const result = await db.select(
        `${tables.PLAYERS}.*`,
        `${tables.RESULTS}.*`,
        `${tables.VARIANTS}.*`
    )
        .from(tables.PLAYERS)
        .leftJoin(tables.PLAYERS_RESULTS, `${tables.PLAYERS_RESULTS}.player_id`, `${tables.PLAYERS}.id`)
        .leftJoin(tables.RESULTS, `${tables.PLAYERS_RESULTS}.result_id`, `${tables.RESULTS}.id`)
        .leftJoin(tables.VARIANTS, `${tables.RESULTS}.variant_id`, `${tables.VARIANTS}.id`)
        .where(`${tables.VARIANTS}.id`, variant)
    result.map(x => {

        const playerData: IPlayerResults = {
            player: x.username,
            location: x.location,
            time: x.time,
            score: x.score,
            proof: x.proof
        }
        const varName: string = x.name;
        if (!variantData[varName]) {
            variantData[varName] = []
        }
        variantData[varName].push(playerData);

    })
    return variantData;
}

export const getAllVariantScores = async (): Promise<Record<string, IPlayerResults[]>> => {
    let variantData: Record<string, IPlayerResults[]> = {};
    const result = await db.select(
        `${tables.PLAYERS}.*`,
        `${tables.RESULTS}.*`,
        `${tables.VARIANTS}.*`
    )
        .from(tables.PLAYERS)
        .leftJoin(tables.PLAYERS_RESULTS, `${tables.PLAYERS_RESULTS}.player_id`, `${tables.PLAYERS}.id`)
        .leftJoin(tables.RESULTS, `${tables.PLAYERS_RESULTS}.result_id`, `${tables.RESULTS}.id`)
        .leftJoin(tables.VARIANTS, `${tables.RESULTS}.variant_id`, `${tables.VARIANTS}.id`)
    result.map(x => {
        const playerData: IPlayerResults = {
            player: x.username,
            location: x.location,
            time: x.time,
            score: x.score,
            proof: x.proof
        }
        const varName: string = x.name;
        if (!variantData[varName]) {
            variantData[varName] = []
        }
        variantData[varName].push(playerData);

    })
    return variantData;
}

// TODO: rather have function that return the querry.
// Now need to write the same thing multiple times.
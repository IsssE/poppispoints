// This seems like its not really the express way of doing it.
// But hey! It works. Will see what happens.
// it's always possible to refactor ":D"
import { IDbPlayerModel, IDbResultModel } from "../../data/interface.db";
import express = require("express");
import * as PlayerDb from "../../data/player";
import * as ResultDb from "../../data/result";
import * as VariantDb from "../../data/variants";
import { notEmpty } from "../../src/utils";
import { IGameData, IPlayerResults, IPlayers } from "../../data/interface.model";

const getScoreRoutes = (): express.Router => {

    const router = express.Router()

    router.get('/', getVariantScores)
    router.post('/newScore', setNewScore)

    return router

}

const setNewScore = async (req: express.Request<any, any, IGameData, any>, res: express.Response) => {
    const newScore: IGameData = req.body;

    try {
        if (!newScore.players) {
            throw new Error("No players in body")
        }

        let playerModels = handlePlayers(newScore.players)
        const playerIds = playerModels.map(x => { return PlayerDb.insertPlayerData(x) })
        const scoreId = await ResultDb.inserResult(await convertScoreModel(newScore));


        await Promise.all(playerIds).then(ids => {
            PlayerDb.linkPlayersResult(ids.filter(notEmpty), scoreId);
            res.status(200).send();
        })
    }
    catch (e: any) {
        res.status(500).send(e.message)
    }

    // TODO: continue with saving the data to db.
    // https://auth0.com/blog/node-js-and-typescript-tutorial-build-a-crud-api/
    // seemd like nice tutorial. Prolly need to do some refactoring
}

const getVariantScores = async  (req: express.Request<any, any, any, {variant?: number} >, res: express.Response) => {
    try {
        const variant = req.query.variant;
        let scores: Promise<Record<string, IPlayerResults[]>>;
        if(!variant) {
            scores = ResultDb.getAllVariantScores();
        } else {
            scores = ResultDb.getVariantScores(variant)
        }
        

        res.status(200).send(await scores);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
}

const convertScoreModel = async (data: IGameData): Promise<IDbResultModel> => {
    const variant = await VariantDb.getVariant(data.variant);
    if(!variant || !variant.id) {
        throw new Error(`Could not find variant for ${data.variant}`) 
    }
    return {
        location: data.representation,
        proof: data.proof,
        time: data.time,
        score: data.score,
        variant_id: variant.id
    }
}

const handlePlayers = (players: IPlayers): IDbPlayerModel[] => {
    if (!players) {
        throw new Error( "Saving score with no player!")
    }

    const result: IDbPlayerModel[] = [];
    // at the moment this is redundant, as this would work no mather what the type
    // leave as is, might need group spesific funtionality
    result.push({ username: players.p1 })
    if ("p2" in players) {
        result.push({ username: players.p2 })
    }
    if ("p4" in players && "p3" in players) {
        result.push({ username: players.p3 })
        result.push({ username: players.p4 })
    }
    return result;
}



// TODO: create type for all variants.
// This should be a list of all variants in db
// allows for dynamic variant creation.
// Go with this for now.
/*const getPlayerScore = async (variant: string = null, player: string = null) => {

}
const getScores = async (req: express.Request, res: express.Response) => {
    try {
        res.status(200).send(await ResultDb.getAllScores());
    } catch (e) {
        res.status(500).send(e.message);
    }
}
*/

export { getScoreRoutes }

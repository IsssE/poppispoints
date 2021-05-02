// This seems like its not really the express way of doing it.
// But hey! It works. Will see what happens.
// it's always possible to refactor ":D"
import { IDbPlayerModel, IDbResultModel } from "../../data/db.interfaces";
import express = require("express");
import { DataParser, IKVData, IData, IPlayers } from "../../data/csv_parser";
import * as PlayerDb from "../../data/player";
import * as ResultDb from "../../data/result";
import * as VariantDb from "../../data/variants";
import { notEmpty } from "../../src/utils";

const getScoreRoutes = (): express.Router => {

    const router = express.Router()


    router.get('/excel', getExcelData)
    router.post('/newScore', setNewScore)
    router.get('/', getScores)

    return router

}

const getExcelData = async (req: express.Request, res: express.Response<IKVData>) => {

    if (req.method === "GET") {
        const parser = new DataParser();
        res.status(200).send(await parser.data)
    }
    else {

    }
}

const setNewScore = async (req: express.Request, res: express.Response) => {
    const newScore: IData = req.body;

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
    catch (e) {
        res.status(500).send(e.message)
    }

    // TODO: continue with saving the data to db.
    // https://auth0.com/blog/node-js-and-typescript-tutorial-build-a-crud-api/
    // seemd like nice tutorial. Prolly need to do some refactoring
}

const convertScoreModel = async (data: IData): Promise<IDbResultModel> => {
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
*/
const getScores = async (req: express.Request, res: express.Response) => {
    console.debug("ARE WE HERE")
    try {
        res.status(200).send(await ResultDb.getAllScores());
    } catch (e) {
        res.status(500).send(e.message);
    }
}

export { getScoreRoutes }

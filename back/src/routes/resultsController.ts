// This seems like its not really the express way of doing it.
// But hey! It works. Will see what happens.
// it's always possible to refactor ":D"
import { IPlayerDbModel, IResultDbModel } from "../../data/db.interfaces";
import express = require("express");
import { DataParser, IKVData, IData, IPlayers } from "../../data/csv_parser";
import * as PlayerDb from "../../data/player";
import * as ResultDb from "../../data/result";
import * as VariantDb from "../../data/variants";

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

    let playerModels = handlePlayers(newScore.players)
    const playerIds = playerModels.map(x => { return PlayerDb.insertPlayerData(x) })
    const scoreId = await ResultDb.inserResult(await convertScoreModel(newScore));

    Promise.all(playerIds).then(ids => {
        PlayerDb.linkPlayersResult(ids, scoreId);
    })


    // TODO: continue with saving the data to db.
    // https://auth0.com/blog/node-js-and-typescript-tutorial-build-a-crud-api/
    // seemd like nice tutorial. Prolly need to do some refactoring
}

const convertScoreModel = async (data: IData): Promise<IResultDbModel> => {
    const variant = await VariantDb.getVariant(data.variant);
    return {
        location: data.representation,
        proof: data.proof,
        time: data.time,
        score: data.score,
        variant_id: variant.id
    }
}

const handlePlayers = (players: IPlayers): IPlayerDbModel[] => {
    if (!players) {
        throw "Saving score with no player!"
    }

    const result: IPlayerDbModel[] = [];
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
const getPlayerScore = async (variant: string = null, player: string = null) => {

}

const getScores = async (req: express.Request, res: express.Response) => {


    res.status(200).send(await VariantDb.getAllVariants());
}

export { getScoreRoutes }

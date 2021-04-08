// This seems like its not really the express way of doing it.
// But hey! It works. Will see what happens.
// it's always possible to refactor ":D"
import express = require("express");
import { DataParser, IKVData, IData } from "../../data/csv_parser";
import * as PlayerModel from "../../data/player";
import * as ResultModel from "../../data/result";
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
    // TODO: continue with saving the data to db.
    // https://auth0.com/blog/node-js-and-typescript-tutorial-build-a-crud-api/
    // seemd like nice tutorial. Prolly need to do some refactoring
    
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

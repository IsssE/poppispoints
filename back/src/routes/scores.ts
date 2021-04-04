// This seems like its not really the express way of doing it.
// But hey! It works. Will see what happens.
// it's always possible to refactor ":D"
import express = require("express");
import DataParser, { IKVData, IData } from "../../data";


const getScoreRoutes = (): express.Router => {

    const router = express.Router()

    router.get('/', getData)
    router.post('/newScore', setNewScore)

    return router

}

const getData = ( req: express.Request, res: express.Response<IKVData>) => {
    if(req.method === "GET") {
        const parser = new DataParser();
        parser.data.then(x => {
            res.send(x);
        });
    }
}

const setNewScore = (req: express.Request, res: express.Response) => {
    const newScore: IData = req.body;
    // TODO: continue with saving the data to db.
    // https://auth0.com/blog/node-js-and-typescript-tutorial-build-a-crud-api/
    // seemd like nice tutorial. Prolly need to do some refactoring
}

export { getScoreRoutes }

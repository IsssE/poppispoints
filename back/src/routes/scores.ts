// This seems like its not really the express way of doing it.
// But hey! It works. Will see what happens.
// it's always possible to refactor ":D"
import express = require("express");
import DataParser, { IKVData } from "../../data";


const getScoreRoutes = (): express.Router => {

    const router = express.Router()

    router.get('/', getData)

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

export { getScoreRoutes }

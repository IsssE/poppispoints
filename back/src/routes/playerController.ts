// This seems like its not really the express way of doing it.
// But hey! It works. Will see what happens.
// it's always possible to refactor ":D"
import express = require("express");
import * as PlayerDb from "../../data/player";
export const getPlayerRoutes = (): express.Router => {

    const router = express.Router()

    router.get('/scores', getPlayerScores)

    return router

}

const getPlayerScores = async (req: express.Request<any, any, any, {username: string} >, res: express.Response) => {
    try {
        const username = req.query.username;
        if(!username) {
            throw new Error("Parameter 'username' missing")
        }
        res.status(200).send(await PlayerDb.getPlayerScores(username));
    } catch (e) {
        res.status(500).send(e.message);
    }
}
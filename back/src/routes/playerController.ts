// This seems like its not really the express way of doing it.
// But hey! It works. Will see what happens.
// it's always possible to refactor ":D"
import express = require("express");
import { DataParser, IKVData, IData } from "../../data/csv_parser";
import * as PlayerModel from "../../data/player";
import * as ResultModel from "../../data/result";

const getScoreRoutes = (): express.Router => {

    const router = express.Router()

    router.post('/newPlayer', setNewPlayer)
 
    return router

}

const setNewPlayer = () => {

}


// This seems like its not really the express way of doing it.
// But hey! It works. Will see what happens.
// it's always possible to refactor ":D"
import { getVariant } from "../../data/variants";
import express = require("express");
import { DataParser, IKVData, IData } from "../../data/csv_parser";
import * as PlayerModel from "../../data/player";
import * as ResultModel from "../../data/result";
import { IDbResultModel } from "../../data/db.interfaces";

const getScoreRoutes = (): express.Router => {

    const router = express.Router()

    //router.post('/newPlayer', setNewPlayerScore)
 
    return router

}

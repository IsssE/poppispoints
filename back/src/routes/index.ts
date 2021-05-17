import express = require("express");
import { getScoreRoutes } from './resultsController';
import { getPlayerRoutes } from './playerController';
import { getVariantRoutes } from "./variantContoller";
import { sendKVData } from "../../data/csv_parser";
// any other routes imports would go here
//import {getMathRoutes} from './math'

const getRoutes = (): express.Router => {

    // create a router for all the routes of our app
    const router = express.Router()
    
    router.use('/scores', getScoreRoutes());
    router.use('/player', getPlayerRoutes());
    router.use('/variants', getVariantRoutes())
    router.post('/excel/runParser/2021', sendKVData);

    // any additional routes would go here

    return router

}

export { getRoutes }

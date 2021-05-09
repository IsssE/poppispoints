import express = require("express");
import { getScoreRoutes } from './resultsController';
import { getPlayerRoutes } from './playerController';
// any other routes imports would go here
//import {getMathRoutes} from './math'

const getRoutes = (): express.Router => {

    // create a router for all the routes of our app
    const router = express.Router()
    
    router.use('/scores', getScoreRoutes());
    router.use('/player', getPlayerRoutes());

    // any additional routes would go here

    return router

}

export { getRoutes }
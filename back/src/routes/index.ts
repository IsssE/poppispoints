import express = require("express");
import { getScoreRoutes } from './scores'

// any other routes imports would go here
//import {getMathRoutes} from './math'

const getRoutes = (): express.Router => {

    // create a router for all the routes of our app
    const router = express.Router()

    router.use('/data', getScoreRoutes())

    // any additional routes would go here

    return router

}

export { getRoutes }
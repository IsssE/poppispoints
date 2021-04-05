import { initDb } from "../data/db";
import { Application } from "express";
import express = require("express")
import { Server } from "http";
import logger from 'loglevel';
import { getRoutes } from "./routes";

const startServer = (): Promise<Server> => {

    const app: Application = express();
    const port = 8080; // default port to listen
    initDb();

    app.use('/api', getRoutes())  

    // add the generic error handler just in case errors are missed by middleware
    //app.use(errorMiddleware)

    return new Promise(resolve => {
        const server = app.listen(port, () => {
            logger.info(`Listening on port ${port}`)
        resolve(server)
      })
    })
}
// here's our generic error handler for situations where we didn't handle
// errors properly
/* rip typiing
function errorMiddleware(error: Error, req: Request, res: Response, next:express.NextFunction) {
    if (res.headersSent) {
        next(error)
    } else {
        logger.error(error)
        res.status(500)
        res.json({
            message: error.message,
            // we only add a `stack` property in non-production environments
            ...(process.env.NODE_ENV === 'production' ? null : { stack: error.stack }),
        })
    }
}*/

export { startServer };
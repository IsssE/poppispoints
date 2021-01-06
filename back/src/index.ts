import { Application } from "express";
import express = require("express")
import * as results from "./results/controller";

const app: Application = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
    console.log(results.get());
} );
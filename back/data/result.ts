import db from "./db"; // importing the db config
import {IPlayer, IResult, IVariant } from "./db.interfaces"

const inserResult = () => {
    const variant: IVariant = {
        description: "",
        league: "A",
        name: ""
    };

    const result: IResult = {
        location: "",
        proof: "",
        score: 0,
        time: new Date(),
    };
    
    // do this https://alexzywiak.github.io/knex-bag-o-functions-modeling-many-to-many-relationships-in-node-2/index.html
    // siims okay
    db.insert(result).into('players')
}
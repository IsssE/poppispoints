import { Knex } from "knex";

const env = process.env.NODE_ENV || 'development'
const knexfile = require('../knexfile')
const knexCon: Knex = require('knex')(knexfile[env])

export enum tables {
    PLAYERS = 'players',
    RESULTS = 'results',
    PLAYERS_RESULTS = 'players_results',
    VARIANTS = 'variants'
}

export default knexCon;
/*
import connection = require('../knexfile')[process.env.NODE_ENV || 'development']
let pool: Pool = null;

export const initDb = () => {
    if(pool) {
        console.warn("initing database again");
    }
}
export const getDb = ( ) => {
    if(pool) {
        return pool
    }
    throw new Error("Trying to get DB before initialization")
}*/
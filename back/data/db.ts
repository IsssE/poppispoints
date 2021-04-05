import sqlite3 = require('sqlite3')
import path = require('path')

let db: sqlite3.Database;
const DBLOC = "/../../db/popoi.db";

export const initDb = () => {
    if(db) {
        console.warn("initing database again");
    }
    
    const relPath = `${__dirname}${DBLOC}`
    console.debug(relPath)

    db = new sqlite3.Database(relPath);
    console.debug("we managed to create db", db)
}
export const getDb = ( ) => {
    if(db) {
        return db
    }
    throw new Error("Trying to get DB before initialization")
}
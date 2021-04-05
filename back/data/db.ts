import sqlite3 = require('sqlite3')

let db: sqlite3.Database;
const DBLOC = "";

export const initDb = () => {
    if(db) {
        console.warn("initing database again");
    }
    db = new sqlite3.Database(DBLOC);
}
export const getDb = ( ) => {
    if(db) {
        return db
    }
    throw new Error("Trying to get DB before initialization")
}
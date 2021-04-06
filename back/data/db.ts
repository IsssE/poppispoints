import { Pool } from 'pg';
import { cs }from './secrets';

let pool: Pool = null;

export const initDb = () => {
    if(pool) {
        console.warn("initing database again");
    }
    pool = new Pool(cs);
}
export const getDb = ( ) => {
    if(pool) {
        return pool
    }
    throw new Error("Trying to get DB before initialization")
}
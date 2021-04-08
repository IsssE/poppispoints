import db from "./db"; // importing the db config
import { IVariant } from "./db.interfaces"
/* 
interface IPlayer {
    id: number,
    username: string;
    result: readonly IResult[];
}*/
let allVariants: IVariant[] = null;
export const getAllVariants = async (): Promise<IVariant[]> => {
    
    if(!allVariants) {
        await db.from('variants').then(x => {
            allVariants = x; 
        })
    }

    return allVariants;
}

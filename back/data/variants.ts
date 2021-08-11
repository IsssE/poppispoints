import db, { tables } from "./db"; // importing the db config
import { IDbVariantModel } from "./interface.db"
/* 
interface IPlayer {
    id: number,
    username: string;
    result: readonly IResult[];
}*/
let allVariants: IDbVariantModel[]= [];
export const getAllVariants = async (): Promise<IDbVariantModel[]> => {
    
    if(!allVariants || allVariants.length <= 0 ) {
        await db<IDbVariantModel>(tables.VARIANTS).then(x => {
            allVariants = x; 
        })
    }

    return allVariants;
}

export const getVariant = async (name: string): Promise<IDbVariantModel | undefined> => {
    const all = await getAllVariants();
    return all.find(x => {
        return x.name === name;
    })
}
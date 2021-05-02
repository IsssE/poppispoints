import db, { tables } from "./db"; // importing the db config
import { IDbVariantModel } from "./db.interfaces"
/* 
interface IPlayer {
    id: number,
    username: string;
    result: readonly IResult[];
}*/
let allVariants: IDbVariantModel[] = null;
export const getAllVariants = async (): Promise<IDbVariantModel[]> => {
    
    if(!allVariants) {
        await db<IDbVariantModel>(tables.VARIANTS).then(x => {
            allVariants = x; 
        })
    }

    return allVariants;
}

export const getVariant = async (name: string): Promise<IDbVariantModel | undefined> => {
    const all = await getAllVariants();
    return all.find(x => {
        return x.name === name
    })
}
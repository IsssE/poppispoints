import db from "./db"; // importing the db config
import { IVariantDbModel } from "./db.interfaces"
/* 
interface IPlayer {
    id: number,
    username: string;
    result: readonly IResult[];
}*/
let allVariants: IVariantDbModel[] = null;
export const getAllVariants = async (): Promise<IVariantDbModel[]> => {
    
    if(!allVariants) {
        await db<IVariantDbModel>('variants').then(x => {
            allVariants = x; 
        })
    }

    return allVariants;
}

export const getVariant = async (name: string): Promise<IVariantDbModel | undefined> => {
    const all = await getAllVariants();
    return all.find(x => {
        return x.name === name
    })
}
import { getAllVariants } from "../../data/variants";
import express from "express"
import { IVariantInfo } from "../../data/model.interfaces";

export const getVariantRoutes = (): express.Router => {

    const router = express.Router()


    router.get('/', getVariants)

    return router

}

const getVariants = async  (req: express.Request, res: express.Response<IVariantInfo[]>) => {
    try {

        const variants = await getAllVariants();
        
        const result = variants.map(x => {
            return {name: x.name}
        });
        
        res.status(200).send(await result);
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}


import { Card } from "evergreen-ui";
import React from "react";
import { IPlayerResults, IVariantInfo } from "../../../back/data/model.interfaces";
import { VariantPlayerScoreList } from "./list";
import { VariantCityScores } from "./score";

interface ICardProps {
    variantName: string;
}


export const SummaryCard = (props: ICardProps) => {

    return  <Card>
        <h2 style= {{textAlign: "center"}}>{props.variantName}</h2>
        <VariantPlayerScoreList/>
        <VariantCityScores/>
    </Card>
}
import React from "react";
import { Card } from "semantic-ui-react";
import { IPlayerResults, IVariantInfo } from "../../../back/data/interface.model";
import { IPlayerScoreData } from "../score/interface";
import { VariantPlayerScoreList } from "./list";
import { VariantCityScores } from "./score";

interface ICardProps {
    variantName: string;
    playerScore?: IPlayerScoreData[];
    invertOrder?: boolean;
}

export const SummaryCard = (props: ICardProps) => {

    return <Card>
        {(props.playerScore && props.playerScore.length > 0) ?
            <Card.Content>
                <h2 style={{ textAlign: "center" }}>{props.variantName}</h2>
                <VariantPlayerScoreList scores={props.playerScore} invertOrder={props.invertOrder}/>
                <VariantCityScores variantPlayerData={props.playerScore} />

            </Card.Content>
            :
            <Card.Content>
                <h2 style={{ textAlign: "center" }}>{props.variantName}</h2>
                <span>No games played or error in data fetch :S</span>
            </Card.Content>}
    </Card>
}
import React from "react";
import { Card } from "semantic-ui-react";
import { IPlayerResults, IVariantInfo } from "../../../back/data/model.interfaces";
import { IPlayerScoreData } from "../score/interface";
import { VariantPlayerScoreList } from "./list";
import { VariantCityScores } from "./score";

interface ICardProps {
    variantName: string;
}
const mockData: IPlayerScoreData[] = [
    {
        name: "jallux",
        score: 222,
        location: "Tampere"
    },
    {
        name: "Eronen",
        score: 100,
        location: "Oulu"
    },
    {
        name: "Qizma",
        score: 99,
        location: "Lappeenranta"
    },
    {
        name: "IssE",
        score: 20,
        location: "Helsinki"
    },

]

export const SummaryCard = (props: ICardProps) => {

    return <Card>

        <Card.Content>
            <h2 style={{ textAlign: "center" }}>{props.variantName}</h2>
            <VariantPlayerScoreList scores={mockData} />
            <VariantCityScores variantPlayerData={mockData} />

        </Card.Content>
    </Card>
}

import React from "react";
import { Card, Loader } from "semantic-ui-react";
import { IPlayerResultsWithVariant, IVariantInfo } from "../../../back/data/interface.model";
import { IPlayerScoreData } from "../score/interface";
import { SummaryCard } from "./card";

interface IOverviewProps {
    variants: IVariantInfo[]
}

export const Overview = (props: IOverviewProps) => {
    const [playerData, setPlayerData] = React.useState<Record<string, IPlayerScoreData[]>>();

    React.useEffect(() => {
        fetch("/api/scores").then(x => x.json()).then(data => {
            setPlayerData(data);
        })
    }, [])


    return (props.variants && playerData) ?
        <Card.Group>
            {props.variants.map((x, index) => {
                const data = playerData[x.name] ? playerData[x.name].sort(sortScores) : []
                return <SummaryCard
                    key = {index}
                    variantName={x.name}
                    playerScore={data}
                />
            })}
        </Card.Group>
        :
        <Loader active inline='centered' />
}
function sortScores(a: IPlayerScoreData, b: IPlayerScoreData): number {
    return b.score - a.score;
}
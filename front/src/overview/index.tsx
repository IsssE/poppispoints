
import React from "react";
import Spinner from "react-bootstrap/Spinner";
import { IPlayerResultsWithVariant, IVariantInfo } from "../../../back/data/interface.model";
import { IPlayerScoreData } from "../score/interface";
import { SummaryCard } from "./card";
import { filterDuplicatePlayerScores } from "../misc/util"

interface IOverviewProps {
    variants: IVariantInfo[]
}

export const Overview = (props: IOverviewProps) => {
    const [playerData, setPlayerData] = React.useState<Record<string, IPlayerScoreData[]>>();

    React.useEffect(() => {
        fetch("/api/scores").then(x => x.json()).then((data) => {
            setPlayerData(data);
        })
    }, [])

    return (props.variants && playerData) ?
        <div>
            {props.variants.map((x, index) => {
                let data = playerData[x.name] ? playerData[x.name].sort(sortScores) : []
                if (data) {
                    return <SummaryCard
                        key={index}
                        variantName={x.name}
                        playerScore={filterDuplicatePlayerScores(data, x.ascending)}
                        invertOrder={x.ascending}
                    />
                }
            })}
        </div>
        :
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
}
function sortScores(a: IPlayerScoreData, b: IPlayerScoreData): number {
    return b.score - a.score;
}
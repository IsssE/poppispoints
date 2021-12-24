
import React from "react";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
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

    const getAllCards = (): JSX.Element[] | null => {
        if (!props.variants || !playerData) {
            return null;
        }
        return props.variants.map((x, index) => {
            const newRow = index % 3 === 0
            let data = playerData[x.name] ? playerData[x.name].sort(sortScores) : []
            return <Col className={"overview_card"} key={index}> <SummaryCard
                variantName={x.name}
                playerScore={filterDuplicatePlayerScores(data, x.ascending)}
                invertOrder={x.ascending}
            /></Col>
        })
    }
    
    const structureCards = (cardList: JSX.Element[]): JSX.Element[][] => {
        
        const columnSize = 3;
        return cardList.reduce((result: JSX.Element[][], item, index) => {
            const chunkIndex = Math.floor(index / columnSize)
            if (!result[chunkIndex]) {
                result[chunkIndex] = [] // start a new chunk
            }
            result[chunkIndex].push(item)
            return result
        }, [])
    } 
    const cards = getAllCards();

    const structuredCards= cards ? structureCards(cards) : null;
    
    return cards ?
        <Container>
            {structuredCards?.map((x,index) => {
                return <Row key={index}>{x}</Row>
            })}
        </Container>
        :
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
}
function sortScores(a: IPlayerScoreData, b: IPlayerScoreData): number {
    return b.score - a.score;
}
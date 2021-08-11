import React from "react"
import { Header, Loader, Table, Image } from "semantic-ui-react"
import { getLocationPicture, orderPlayerScores as sortPlayerScores } from "../misc/util"
import { IPlayerScoreData } from "../score/interface"

interface IVariantPlayerScoreList {
    scores: IPlayerScoreData[]
    invertOrder?: boolean;
}


export const VariantPlayerScoreList = (props: IVariantPlayerScoreList) => {
    const getPlayerRow = (player: IPlayerScoreData, index: number): JSX.Element => {
        return <Table.Row key = {index}>
            <Table.Cell>
                <Header as='h4' image>
                    <Image src={getLocationPicture(player.location)} rounded size='mini' />
                    <Header.Content>
                        {player.player}
                    </Header.Content>
                </Header>
            </Table.Cell>
            <Table.Cell>{player.score}</Table.Cell>
        </Table.Row>
    }
    const ascendingOrder = props.invertOrder ? true : false;
    return props.scores ?
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Pelaaja</Table.HeaderCell>
                    <Table.HeaderCell>Nimi</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {props.scores.filter(x => x.score ? true : false).sort((a, b) => sortPlayerScores(a, b, ascendingOrder)).slice(0, 8).map((x, index) => {
                    return getPlayerRow(x, index);
                })}
            </Table.Body>
        </Table>
        : <Loader active inline='centered' />

}
import React from "react"
import { Header, Loader, Table, Image } from "semantic-ui-react"
import { getLocationPicture } from "../misc/util"
import { IPlayerScoreData } from "../score/interface"

interface IVariantPlayerScoreList {
    scores: IPlayerScoreData[]
}

export const VariantPlayerScoreList = (props: IVariantPlayerScoreList) => {
    const getPlayerRow = (player: IPlayerScoreData): JSX.Element => {
        return <Table.Row>
            <Table.Cell>
                <Header as='h4' image>
                    <Image src={getLocationPicture(player.location)} rounded size='mini' />
                    <Header.Content>
                        {player.name}
                    </Header.Content>
                </Header>
            </Table.Cell>
            <Table.Cell>{player.score}</Table.Cell>
        </Table.Row>
    }

    return props.scores ?
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Pelaaja</Table.HeaderCell>
                    <Table.HeaderCell>Nimi</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {props.scores.map(x => {
                    return getPlayerRow(x);
                })}
            </Table.Body>
        </Table>
        : <Loader active inline='centered' />

}
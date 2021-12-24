import React from "react"

//mport { Header, Loader, Table, Image } from "react-bootstrap"
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";

import { getLocationPicture, orderPlayerScores as sortPlayerScores } from "../misc/util"
import { IPlayerScoreData } from "../score/interface"

interface IVariantPlayerScoreList {
    scores: IPlayerScoreData[]
    invertOrder?: boolean;
}


export const VariantPlayerScoreList = (props: IVariantPlayerScoreList) => {
    const getPlayerRow = (player: IPlayerScoreData, index: number): JSX.Element => {
        return <tr key={index}>
            <th>
                <Image src={getLocationPicture(player.location)} rounded />
                {player.player}

            </th>
            <th>{player.score}</th>
        </tr>
    }
    const ascendingOrder = props.invertOrder ? true : false;
    return props.scores ?
        <Table>
            <th>
                <td>Pelaaja</td>
                <td>Nimi</td>
            </th>
            {props.scores.filter(x => x.score ? true : false).sort((a, b) => sortPlayerScores(a, b, ascendingOrder)).slice(0, 8).map((x, index) => {
                return getPlayerRow(x, index);
            })}
        </Table>
        :
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
}

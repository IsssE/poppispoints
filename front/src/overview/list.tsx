import React from "react"
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
            <td>{player.player}</td>
            <td>{player.score}</td>
            <td><Image className="cityIcon" src={getLocationPicture(player.location)} /></td>
        </tr>
    }
    const ascendingOrder = props.invertOrder ? true : false;
    return props.scores ?
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Pelaaja</th>
                    <th>Nimi</th>
                </tr>
            </thead>
            <tbody>

                {props.scores.filter(x => x.score ? true : false).sort((a, b) => sortPlayerScores(a, b, ascendingOrder)).slice(0, 8).map((x, index) => {
                    return getPlayerRow(x, index);
                })}
            </tbody>
        </Table>
        :
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
}

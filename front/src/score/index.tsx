import React, { ReactElement } from "react";
import { IPlayerResults } from "../../../back/data/model.interfaces";
import { Table, Spinner } from "evergreen-ui";

interface IListProps {

}

const ScoreList: React.FC<IListProps> = (): ReactElement => {
    const [scoreList, setScoreList] = React.useState<IPlayerResults[] | null>(null);

    React.useEffect(() => {
        fetch("/api/player/scores?username=Tommi Linnamaa").then(x => x.json()).then(data => {
            setScoreList(data);
        })
    }, [])

    return (
        <div style={{ width: "100%", height: "100%" }}>

            {scoreList ?
                <Table>
                    <Table.Head>
                        <Table.TextHeaderCell>{"Time"}</Table.TextHeaderCell>
                        <Table.TextHeaderCell>{"Location"}</Table.TextHeaderCell>
                        <Table.TextHeaderCell>{"Proof"}</Table.TextHeaderCell>
                        <Table.TextHeaderCell>{"Variant"}</Table.TextHeaderCell>
                        <Table.TextHeaderCell>{"M/N"}</Table.TextHeaderCell>
                        <Table.TextHeaderCell>{"Score"}</Table.TextHeaderCell>
                        
                    </Table.Head>
                    <Table.Body>
                        {scoreList.map((x, index) => {
                            // Depending on data, the score is either by 1, 2 or 4 players
                            // Will refactor once there is different views for each variant.
                            // The data structure might also change
                            // once database and API has been rewritten 
                            return <Table.Row key={index}>
                                <Table.TextCell>{x.time}</Table.TextCell>
                                <Table.TextCell>{x.location}</Table.TextCell>
                                <Table.TextCell>{x.proof}</Table.TextCell>
                                <Table.TextCell>{x.variant.name}</Table.TextCell>
                                <Table.TextCell>{x.variant.league}</Table.TextCell>
                                <Table.TextCell>{x.score}</Table.TextCell>
                            </Table.Row>
                        })}
                    </Table.Body>
                </Table> :
                <Spinner style={{ display: "block", marginLeft: "auto", marginRight: "auto" }} />}
        </div>
    )
}

export default ScoreList;
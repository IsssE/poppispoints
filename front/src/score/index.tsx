import React, { ReactElement } from "react";
import { IKVData } from "../../../back/data";
import { Table, Spinner } from "evergreen-ui";

interface IListProps {

}

const ScoreList: React.FC<IListProps> = (): ReactElement => {
    const [scoreList, setScoreList] = React.useState<IKVData | null>(null);

    React.useEffect(() => {
        fetch("/api/data").then(x => x.json()).then(data => {
            setScoreList(data);
        })
    }, [])

    return (
        <div style={{ width: "100%", height: "100%" }}>

            {scoreList ?
                <Table>
                    <Table.Head>
                        {scoreList.headers.map(x => {
                            return <Table.TextHeaderCell>{x}</Table.TextHeaderCell>
                        })}
                    </Table.Head>
                    <Table.Body>
                        {scoreList.data.slice(0,10).map((x, index) => {
                            // Depending on data, the score is either by 1, 2 or 4 players
                            // Will refactor once there is different views for each variant.
                            // The data structure might also change
                            // once database and API has been rewritten 
                            return <Table.Row key={index}>
                                <Table.TextCell>{x.time}</Table.TextCell>
                                <Table.TextCell>{x.representation}</Table.TextCell>
                                <Table.TextCell>{x.proof}</Table.TextCell>
                                <Table.TextCell>{x.variant}</Table.TextCell>
                                <Table.TextCell>{x.league}</Table.TextCell>
                                <Table.TextCell>{x.result?.score}</Table.TextCell>
                            </Table.Row>
                        })}
                    </Table.Body>
                </Table> :
                <Spinner style={{ display: "block", marginLeft: "auto", marginRight: "auto" }} />}
        </div>
    )
}

export default ScoreList;
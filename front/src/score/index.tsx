import React, { ReactElement } from "react";
import Spinner from "react-bootstrap/Spinner";
import { IPlayerResultsWithVariant } from "../../../back/data/interface.model";

interface IListProps {

}

const ScoreList: React.FC<IListProps> = (): ReactElement => {
    const [scoreList, setScoreList] = React.useState<IPlayerResultsWithVariant[] | null>(null);

    React.useEffect(() => {
        fetch("/api/player/scores?username=Tommi Linnamaa").then(x => x.json()).then(data => {
            setScoreList(data);
        })
    }, [])

    return (
        <div style={{ width: "100%", height: "100%" }}>

            {
                scoreList ?
                    <span>new ui here </span> :
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
            }
        </div>
    )
}

export default ScoreList;
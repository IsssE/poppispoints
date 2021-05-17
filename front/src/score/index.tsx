import React, { ReactElement } from "react";
import { Loader } from "semantic-ui-react";
import { IPlayerResultsWithVariant } from "../../../back/data/model.interfaces";

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
                    <Loader active inline='centered' />
            }
        </div>
    )
}

export default ScoreList;
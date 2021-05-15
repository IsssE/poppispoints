
import { Card } from "evergreen-ui";
import { IPlayerResults } from "../../../back/data/model.interfaces";
import { VariantPlayerScoreList } from "./list";

interface ICardProps {
    scores: IPlayerResults[]
}

const SummaryCard = (props: ICardProps) => {

    return <Card>
        <VariantPlayerScoreList/>
        
    </Card>
}
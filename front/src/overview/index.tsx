
import React from "react";
import { Card, Loader } from "semantic-ui-react";
import { IVariantInfo } from "../../../back/data/model.interfaces";
import { SummaryCard } from "./card";

export const Overview = () => {
    const [variants, setVariants] = React.useState<IVariantInfo[]>([]);

    React.useEffect(() => {
        fetch("/api/variants").then(x => x.json()).then(data => {
            setVariants(data);
        })
    }, [])

    return variants ?
        <Card.Group>
            {variants.map((x, index) => {
                return <SummaryCard
                    key = {index}
                    variantName={x.name}
                />
            })}
        </Card.Group>
        :
        <Loader active inline='centered' />
}

import { Spinner } from "evergreen-ui";
import React from "react";
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
        <>
            {variants.map(x => {
                return <SummaryCard
                    variantName={x.name}
                />
            })}
        </>
        :
        <Spinner />
}
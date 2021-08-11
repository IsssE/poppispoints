import React from 'react'
import { IVariantInfo } from '../../../back/data/interface.model'
import { NavigationBar } from '../navigation/navigationBar'
import { Overview } from '../overview'

const Popoi = () => {



    // Move to rexud state
    const [activeMenu, setActiveMenu] = React.useState<string>("Yhteenveto")
    const [variants, setVariants] = React.useState<IVariantInfo[]>([]);

    React.useEffect(() => {
        fetch("/api/variants").then(x => x.json()).then(data => {
            setVariants(data);
        })
    }, [])

    const getActiveView = (name: string): JSX.Element => {
        switch (name) {
            case "Yhteenveto":
                return <Overview variants={variants} />
            case "KV Pisteet":
                return <div>{`${name}: is under construction, WIP`}</div>
            case "Laji":
                return <div>{`${name}: is under construction, WIP`}</div>
            default:
                return <Overview variants={variants} />
        }
    }
    return <div>
        <NavigationBar
            active={activeMenu}
            onChangeActive={setActiveMenu}
            variants={variants} 
        />
        {getActiveView(activeMenu)}
    </div>
}

export default Popoi;
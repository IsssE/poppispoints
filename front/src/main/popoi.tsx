import React from 'react'
import { NavigationBar } from '../navigation/navigationBar'
import { Overview } from '../overview'

const Popoi = () => {

    // Move to rexud state
    const [activeMenu, setActiveMenu] = React.useState<string>("Yhteenveto")

    const getActiveView = (name: string): JSX.Element => {
        switch (name) {
            case "Yhteenveto":
                return <Overview />
            case "KV Pisteet":
                return <div>{`${name}: is under construction, WIP`}</div>
            case "Laji":
                return <div>{`${name}: is under construction, WIP`}</div>
            default:
                return <Overview />
        }
    }
    return <div>
        <NavigationBar
            active={activeMenu}
            onChangeActive={setActiveMenu}
        />
        {getActiveView(activeMenu)}
    </div>
}

export default Popoi;
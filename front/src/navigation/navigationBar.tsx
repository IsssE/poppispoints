import React, { SyntheticEvent } from 'react'
import { Menu, MenuItemProps } from 'semantic-ui-react'

interface INavigationBarProps {
    active: string;
    onChangeActive: React.Dispatch<React.SetStateAction<string>>
}

export const NavigationBar = (prop: INavigationBarProps) => {

    const handleItemClick = (e: SyntheticEvent, data: MenuItemProps) => {
        const active = items.find(x => {
            return x.name === data.name;
        })
        if (active && active.name) {
            prop.onChangeActive(active.name)
        }
        // ajatus ei kulje. 
        // https://react.semantic-ui.com/collections/menu/#types-content-prop
        // mistä tuo lista menu itemejä pitäs tulla. 
        // joku state setti?
    }
    const items: MenuItemProps[] = [
        { key: 'overview', name: 'Yhteenveto', onClick: handleItemClick },
        { key: 'cityScore', name: 'KV Pisteet', onClick: handleItemClick },
        { key: 'variant', name: 'Laji', onClick: handleItemClick },
    ]

    items.forEach(x => {
        x.active = prop.active === x.name
    })

    return <Menu items={items}>

    </Menu>
}

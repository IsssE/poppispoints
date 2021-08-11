import React, { CSSProperties, SyntheticEvent } from 'react'
import { Button, Icon, Menu, MenuItemProps } from 'semantic-ui-react'
import { IVariantInfo } from '../../../back/data/interface.model'
import { AddScoreModal } from './addScoreModal'

interface INavigationBarProps {
    active: string;
    onChangeActive: React.Dispatch<React.SetStateAction<string>>;
    variants: IVariantInfo[]
}

export const NavigationBar = (prop: INavigationBarProps) => {

    const handleItemClick = (e: SyntheticEvent, data: MenuItemProps) => {
        const active = items.find(x => {
            return x.name === data.name;
        })
        if (active && active.name) {
            prop.onChangeActive(active.name)
        }
    }

    const items: MenuItemProps[] = [
        { key: 'overview', name: 'Yhteenveto', iconName: "winner" },
        { key: 'cityScore', name: 'KV Pisteet', iconName: "winner" },
        { key: 'variant', name: 'Laji', iconName: "winner" },
    ]

    items.forEach(x => {
        x.active = prop.active === x.name
    })

    const modalButton = <Button animated='vertical' primary >
        <Button.Content visible>
            <Icon name={'add'}></Icon>
        </Button.Content>
        <Button.Content hidden>Lisää</Button.Content>
    </Button>

    return <Menu icon="labeled">
        {items.map((item, index) => {
            return <Menu.Item
                key={index}
                name={item.name}
                active={item.name === prop.active}
                onClick={handleItemClick}
            >
                <Icon name={item.iconName}></Icon>
                {item.name}
            </Menu.Item>
        })}
        <Menu.Menu position="left">
            <div style={{ display: "flex", alignItems: "center" }}>
                <div style={buttonStyle}>
                    {
                        <AddScoreModal 
                        openButton={modalButton}
                        variants={prop.variants} />
                    }
                </div>
            </div>
        </Menu.Menu>


    </Menu>
}

const buttonStyle: CSSProperties = {
    padding: "5px",
    paddingLeft: "15px"
}
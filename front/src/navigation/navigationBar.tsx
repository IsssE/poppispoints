import React, { CSSProperties, SyntheticEvent } from 'react'
import { Button, Icon, Menu, MenuItemProps } from 'semantic-ui-react'

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

    }

    const handleAddScore = () => {
        alert("abua")
    }

    const items: MenuItemProps[] = [
        { key: 'overview', name: 'Yhteenveto', onClick: handleItemClick, iconName: "winner" },
        { key: 'cityScore', name: 'KV Pisteet', onClick: handleItemClick, iconName: "winner" },
        { key: 'variant', name: 'Laji', onClick: handleItemClick, iconName: "winner" },
    ]

    items.forEach(x => {
        x.active = prop.active === x.name
    })
    // G2G, add blue background for add button. Create add functionality
    return <Menu icon="labeled">
        {items.map(item => {
            return <Menu.Item
                name={item.name}
                active={item.name === prop.active}
                onClick={handleItemClick}
            >
                <Icon name={item.iconName}></Icon>
                {item.name}
            </Menu.Item>
        })}
        <Menu.Menu position="left">

            <div style={{display: "flex", alignItems:"center"}}>
                <div style={buttonStyle}>
                    <Button animated='vertical' primary onClick={handleAddScore}>
                        <Button.Content visible>
                            <Icon name={'add'}></Icon>
                        </Button.Content>
                        <Button.Content hidden>Lisää</Button.Content>
                    </Button>
                </div>
            </div>
        </Menu.Menu>


    </Menu>
}

const buttonStyle: CSSProperties = {
    padding: "5px",
    paddingLeft: "15px"
}
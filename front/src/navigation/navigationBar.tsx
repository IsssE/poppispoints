import React, { CSSProperties, SyntheticEvent } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { IVariantInfo } from '../../../back/data/interface.model'
import { AddScoreModal } from './addScoreModal'

interface INavigationBarProps {
    active: string;
    onChangeActive: React.Dispatch<React.SetStateAction<string>>;
    variants: IVariantInfo[]
}

export const NavigationBar = (prop: INavigationBarProps) => {

    const handleItemClick = (e: SyntheticEvent, data: any) => {
        const active = items.find(x => {
            return x.name === data.name;
        })
        if (active && active.name) {
            prop.onChangeActive(active.name)
        }
    }

    const items: any[] = [
        { key: 'overview', name: 'Yhteenveto', iconName: "winner" },
        { key: 'cityScore', name: 'KV Pisteet', iconName: "winner" },
        { key: 'variant', name: 'Laji', iconName: "winner" },
    ]

    items.forEach(x => {
        x.active = prop.active === x.name
    })

    return <Navbar >
            <Nav variant="pills" defaultActiveKey={items[0]}>

                {items.map(x => {
                    return <Nav.Item>
                        <Nav.Link eventKey={x.key} onClick={(event) => { handleItemClick(event, x) }}>{x.name}</Nav.Link>
                    </Nav.Item>
                })}
            </Nav>
    </Navbar>

}

const buttonStyle: CSSProperties = {
    padding: "5px",
    paddingLeft: "15px"
}
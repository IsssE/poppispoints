import React from 'react';
import { CheckboxProps, Dropdown, DropdownProps, Form, Header, Label, Radio, Select } from 'semantic-ui-react';
import { IGameData, IVariantInfo } from '../../../back/data/model.interfaces';

const representation = [
    { key: 'TRE', text: 'Tampere', value: 'Tampere' },
    { key: 'OLU', text: 'Oulu', value: 'Oulu' },
    { key: 'LPR', text: 'Lappeenranta', value: 'Lappeenranta' },
    { key: 'HEL', text: 'Helsinki', value: 'Helsinki' },
    { key: 'O', text: 'Other', value: 'Other' },
]


const league = [
    { key: 'M', text: 'Miesten', value: 'M' },
    { key: 'N', text: 'Naisten', value: 'N' },
]

interface IScoreFormProps {
    variants: IVariantInfo[];
}

export const AddScoreForm = (props: IScoreFormProps) => {
    const [formState, setFormState] = React.useState<IGameData>(
        {
            league: '',
            proof: '',
            representation: '',
            score: 0,
            time: new Date(),
            variant: '',
            players: { p1: '' }
        }
    )


    const handleRadioChange = (e: React.FormEvent<HTMLInputElement>, value: CheckboxProps) => {
        // Was wondering what is the correct way.
        // Do this https://react.semantic-ui.com/collections/form/#usage-capture-values
        // Still need to understand how to typescript it
        if (value.value && typeof value.value === "string") {

            setFormState({ ...formState, league: value.value })


        }
    }


    return <Form>

        <Form.Group>
            <Form.Select
                label='Kaupunki'
                required
                width='4'
                placeholder='Kaupunki'
                fluid
                selection
                options={representation}
            />

            <Form.Select
                label={'Laji'}
                required
                width='4'
                placeholder='Laji'
                fluid
                selection
                options={props.variants.map(v => {
                    return { key: v.name, text: v.name, value: v.name }
                })}
            />
        </Form.Group>
        <Form.Group inline>

            {league.map((o, index) => {
                return <Form.Radio
                    key={index}
                    control={Radio}
                    label={o.text}
                    value={o.value}
                    checked={formState.league === o.value}
                    onChange={handleRadioChange}
                />
            })}
        </Form.Group>
        <br />
        <Form.Group>
            <Form.Input
                required
                width='6'
                label='Pelaajan nimi'
                placeholder='Nimi'
            />

            <Form.Input
                required
                width='3'
                label='Tulos'
                placeholder='Pisteet'
            //error={'Numero vaadittu'}
            />

        </Form.Group>
        <Header>Todiste tuloksesta (linkki videoon tai Kyykkäliiton kilpailu jossa suoritus tapahtui)</Header>
        <Form.Input
            required
            fluid
            placeholder='Linkki tai kilpailun nimi' />


    </Form>
}
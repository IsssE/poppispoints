import React from "react"
import { Button, CheckboxProps, DropdownProps, Form, Header, Modal, Radio } from "semantic-ui-react"
import { IGameData, IVariantInfo } from "../../../back/data/model.interfaces";

interface IModalProps {
    openButton: React.ReactNode;
    variants: IVariantInfo[]
}

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

export const AddScoreModal = (props: IModalProps) => {

    const [open, setOpen] = React.useState<boolean>(false);
    const [canSubmit, setCanSubmit] = React.useState<boolean>(false);
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
    React.useEffect(() => {
        setCanSubmit(checkValidForm());
    }, [formState])

    const handleRadioChange = (e: React.FormEvent<HTMLInputElement>, value: CheckboxProps) => {
        // Was wondering what is the correct way.
        // Do this https://react.semantic-ui.com/collections/form/#usage-capture-values
        // Still need to understand how to typescript it
        if (value.value && typeof value.value === "string") {
            setFormState({ ...formState, league: value.value })
        }
    }

    const handleDropDownVariantChange = (event: React.SyntheticEvent<HTMLElement, Event>, value: DropdownProps) => {
        // Was wondering what is the correct way.
        // Do this https://react.semantic-ui.com/collections/form/#usage-capture-values
        // Still need to understand how to typescript it
        if (value.value && typeof value.value === "string") {
            setFormState({ ...formState, variant: value.value })
        }
    }

    const handleDropDownCityChange = (event: React.SyntheticEvent<HTMLElement, Event>, value: DropdownProps) => {
        if (value.value && typeof value.value === "string") {
            setFormState({ ...formState, representation: value.value })
        }
    }

    const isValidString = (val?: string): boolean => {
        return val ? true : false
    }

    const isNumber = (val: number): boolean => {
        return val ? true : false
    }

    const checkValidForm = (): boolean => {
        if (!isValidString(formState.league)) {
            return false;
        }
        if (!isValidString(formState.proof)) {
            return false;
        }
        if (!isValidString(formState.representation)) {
            return false;
        }
        if (!isNumber(formState.score)) {
            return false;
        }
        if (!isValidString(formState.variant)) {
            return false;
        }
        if (!isValidString(formState.players?.p1)) {
            return false;
        }
        return true;
    }

    return <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={props.openButton}
    >
        <Modal.Header>Lisää tulos</Modal.Header>
        <Modal.Content>
            <Form>
                <Form.Group>
                    <Form.Select
                        label='Kaupunki'
                        required
                        width='4'
                        placeholder='Kaupunki'
                        fluid
                        selection
                        options={representation}
                        onChange={handleDropDownCityChange}
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
                        onChange={handleDropDownVariantChange}
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
                        onChange={(e) => {
                            setFormState({ ...formState, players: { p1: e.target.value } })
                        }}
                    />

                    <Form.Input
                        required
                        width='3'
                        label='Tulos'
                        placeholder='Pisteet'
                        onChange={(e) => {
                            setFormState({ ...formState, score: Number(e.target.value) })
                        }}
                    //error={'Numero vaadittu'}
                    />

                </Form.Group>
                <Header>Todiste tuloksesta (linkki videoon tai Kyykkäliiton kilpailu jossa suoritus tapahtui)</Header>
                <Form.Input
                    required
                    fluid
                    placeholder='Linkki tai kilpailun nimi'
                    onChange={(e) => {
                        setFormState({ ...formState, proof: e.target.value })
                    }}
                />
            </Form>
        </Modal.Content>
        <Modal.Actions>
            <Button color='blue' onClick={() => setOpen(false)}>
                EIKU
            </Button>
            <Button
                color='green'
                disabled={!canSubmit}
                onClick={() => setOpen(false)}
            >
                Lisää
            </Button>
        </Modal.Actions>
    </Modal>
}
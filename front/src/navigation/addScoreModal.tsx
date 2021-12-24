import React from "react"

import { IGameData, IVariantInfo } from "../../../back/data/interface.model";

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
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [canSubmit, setCanSubmit] = React.useState<boolean>(false);
    const [scoreValue, setScoreValue] = React.useState<string>('');
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

    const sendNewScore = () => {
        console.log("sending data", formState)
        fetch("/api/scores/newScore", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
        }).then(() => {
                setIsLoading(false)
                setOpen(false)
            })
            .catch(err => {
                alert(err);
                setIsLoading(false);
                setOpen(false)
            })
        setIsLoading(true);
    }

    const handleRadioChange = (e: React.FormEvent<HTMLInputElement>, value: any) => {
        // Was wondering what is the correct way.
        // Do this https://react.semantic-ui.com/collections/form/#usage-capture-values
        // Still need to understand how to typescript it
        if (value.value && typeof value.value === "string") {
            setFormState({ ...formState, league: value.value })
        }
    }

    const handleDropDownVariantChange = (event: React.SyntheticEvent<HTMLElement, Event>, value: any) => {
        // Was wondering what is the correct way.
        // Do this https://react.semantic-ui.com/collections/form/#usage-capture-values
        // Still need to understand how to typescript it
        if (value.value && typeof value.value === "string") {
            setFormState({ ...formState, variant: value.value })
        }
    }

    const handleDropDownCityChange = (event: React.SyntheticEvent<HTMLElement, Event>, value: any) => {
        if (value.value && typeof value.value === "string") {
            setFormState({ ...formState, representation: value.value })
        }
    }

    // most retarded check, but hey, atlest it's something
    const isValidString = (val?: string): boolean => {
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
        if (isNaN(scoreValue as any)) {
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

    return <div>Add in here</div>
}
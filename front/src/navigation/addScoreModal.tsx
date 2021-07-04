import React from "react"
import { Button, Modal } from "semantic-ui-react"
import { IVariantInfo } from "../../../back/data/model.interfaces";
import { AddScoreForm } from "./addScoreForm";

interface IModalProps {
    openButton: React.ReactNode;
    variants: IVariantInfo[]
}

export const AddScoreModal = (props: IModalProps) => {

    const [open, setOpen] = React.useState<boolean>(false);

    return <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={props.openButton}
    >
        <Modal.Header>Lisää tulos</Modal.Header>
        <Modal.Content>
            {<AddScoreForm variants= {props.variants}/>}
        </Modal.Content>
        <Modal.Actions>
            <Button color='blue' onClick={() => setOpen(false)}>
                EIKU
            </Button>
            <Button
                color='green'
                onClick={() => setOpen(false)}
            >
                Lisää
            </Button>
        </Modal.Actions>
    </Modal>
}
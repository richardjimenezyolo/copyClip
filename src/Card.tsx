import React, {FC} from 'react';
import {ipcRenderer} from 'electron';

interface CardProps {
    children: string
}

const Card: FC<CardProps> = (props) => {
    const copy = (text: string) => {
        console.log(text)
        ipcRenderer.send('cc-write', text)
        ipcRenderer.send('cc-close')
    }

    const keyPressed = (ev: any) => {
        console.log(ev)
        if (ev.keyCode === 13) {
            copy(props.children)
        }
    }

    return (
        <div
            onClick={() => copy(props.children)}
            onKeyDown={keyPressed}
            className="cc-card"
            tabIndex={1}
        >
            {props.children}
        </div>
    )
}

export default Card;

import React, {FC} from 'react';
import {ipcRenderer} from 'electron';

interface CardProps {
    children: string
}

const Card: FC<CardProps> = (props) => {
    const copy = (text: string) => {
        console.log(text)
        ipcRenderer.send('cc-write', text)
    }
    return (
        <div
            onClick={() => copy(props.children)}
            className="cc-card text-white py-3 border-red-600 border overflow-hidden px-2 mx-2 my-2 bg-gray-800 cursor-pointer"
        >
            {props.children}
        </div>
    )
}

export default Card;

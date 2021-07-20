import React, {FC, useState} from 'react'
import {ipcRenderer} from 'electron'
import Card from "./Card";

const App: FC = () => {
    const [items, setItems] = useState([] as string[]);

    ipcRenderer.on('cc-read', (evt, arg) => {
        setItems(arg)
        console.log('requested');
    })

    return (
        <>
            <div className="main">
                {items.reverse().map((el, idx) => {
                    return (
                        <Card key={idx}>
                            {el}
                        </Card>
                    )
                })}
            </div>
        </>
    )
}

export default App;

import React from 'react';
import { Chat } from './Chat';
import './imessage.css';
import { Sideber } from './Sideber';


export const Imessage = () => {
    return (
        <div className="imessage">
           <Sideber/>
           <Chat />
        </div>
    )
}

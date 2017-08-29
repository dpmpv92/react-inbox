import React, {Component} from 'react';
import logo from './logo.svg';
import Message from './Message';
import './App.css';
import * as data from './seedData';

const Messages = ({messages, selectHandler, favoriteHandler}) => {
    function renderMessages() {
        return messages.map((message, index) => {
            return <Message key={index}
                            id={message.id}
                            subject={message.subject}
                            read={message.read}
                            starred={message.starred}
                            labels={message.labels}
                            selected={message.selected}
                            selectHandler={selectHandler}
                            favoriteHandler={favoriteHandler}/>
        });
    }

    return (
        <div name="messages">
            {renderMessages()}
        </div>

    )
}

export default Messages;

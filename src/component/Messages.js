import React from 'react';
import Message from './Message';
import {connect} from "react-redux";

const Messages = ({messages}) => {
    function renderMessages() {
        return messages.map((message, index) => {
            return <Message key={index}
                            id={message.id}
                            subject={message.subject}
                            read={message.read}
                            starred={message.starred}
                            labels={message.labels}
                            selected={message.selected}/>
        });
    }

    return (
        <div name="messages">
            {renderMessages()}
        </div>

    )
}

const mapStateToProps = state => ({
    messages: state.messages.messages,

})

export default connect(
    mapStateToProps,
    null
)(Messages)

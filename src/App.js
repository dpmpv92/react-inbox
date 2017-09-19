import React, {Component} from 'react';
import Messages from './Messages';
import ComposeForm from './ComposeForm';
import './App.css';

class App extends Component {

    selectButtonHandler= () => {
        if (this.state.messages.filter(message => !message.selected).length === 0 ){
            this.setState(this.state.messages.map(message => message.selected = false))
        }
        else{
            this.setState(this.state.messages.map(message => message.selected = true))
        }
    };

    filterSelected = () => {
        return this.state.messages.filter(message => !message.selected);
    }

    constructor(props) {
        super(props)
        this.state = {messages: [], showComposeForm: false}
    }

    countUnread = () => {
        let unread = this.state.messages.filter(message =>
            message.read === false
        )
        return unread.length
    };

    deleteSelected = () => {
        const messageIds = this.getSelectedIds();
        const messages = this.filterSelected()
        this.setState({ messages })
        this.makeApiCall("/api/messages", "PATCH", JSON.stringify({ messageIds: [messageIds],
            command: 'delete',}))
    }

    selectHandler = (id) => {
        this.setState(this.toggleSelectOnId(id))
    }
    favoriteHandler = (id) => {
        this.setState(this.toggleFavoriteOnId(id))
    }

    toggleSelectOnId = (id) => {
        return this.state.messages.map((message) => message.id === id ? this.toggleSelected(message) : message);
    }
    toggleFavoriteOnId = (id) => {
        return this.state.messages.map((message) => message.id === id ? this.toggleFavorite(message) : message);
    }

    toggleSelected = (message) => {
        message.selected = message.selected ? false : true;
        return message;
    }
    toggleFavorite = (message) => {
        message.starred = message.starred ? false : true;
        this.makeApiCall("/api/messages","PATCH", JSON.stringify({messageIds: [message.id],
            command: 'star',
            star: message.starred,}))
        return message;
    }

    countSelected = () => {
        return this.getSelected().length
    }

    selectAllState = () => {
        if (this.countSelected() === 0){
            return "fa fa-square-o";
        }
        else if (this.countSelected() === this.state.messages.length){
            return "fa fa-check-square-o";
        }
        else{
            return "fa fa-minus-square-o";
        }
    }
    markAsRead = () => {
        this.setReadStatus(true);
    }

    setReadStatus = (status) => {
        let messageIds = [];
        this.setState(this.state.messages.map((message) => {
            message.selected === true ? this.setMessageReadStatusAndAddToArray(message, status, messageIds) : message.selected
            return message;
        }))
        this.makeApiCall("/api/messages","PATCH", JSON.stringify({  messageIds: messageIds,
            command: 'read',
            read: status,}))
    }

    setMessageReadStatusAndAddToArray = (message, status, messageIds) => {
        messageIds.push(message.id);
        return message.read = status;
    }
    markAsUnread = () => {
        this.setReadStatus(false);
    }
    isDisabled = () => {
        if (this.countSelected() === 0){
            return "disabled"
        }
        else {
            return ""
        }
    }

    filterLabelFromMessage = (message, selectedLabel) => {
        return ({... message , labels: message.labels.filter(label => label !== selectedLabel)});
    }
    addLabelToMessage = (message, selectedLabel) => {
        return ({... message , labels: message.labels.concat(selectedLabel)});
    }


    removeLabelFromSelected = (e) => {
        const selectedLabel = e.target.value
        let messageIds = this.getSelectedIds()
        const messages = this.state.messages.map(message => message.selected ?
            this.filterLabelFromMessage(message,selectedLabel) : message)
        this.setState({messages});
        this.makeApiCall('/api/messages','PATCH', JSON.stringify({  messageIds: messageIds,
            command: 'removeLabel',
            label: selectedLabel}));
    }
    makeApiCall = async(path, method, body) => {
        let response = await fetch(path, {
            method: method,
            body: body,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        let data = await response.json();
        return data;
    }

    addMessage = async(subject, body) =>{
        const newMessage = await this.makeApiCall("/api/messages", "POST", JSON.stringify({subject: subject, body: body}))
        console.log(newMessage);
        this.setState({messages: this.state.messages.concat(newMessage)})
    }

    addLabel = (e) => {
        let messageIds = this.getSelectedIds();
        const selectedLabel = e.target.value
        const messages = this.state.messages.map(message => message.selected ?
            this.addLabelToMessage(message,selectedLabel) : message)
        this.setState({messages});
        this.makeApiCall('/api/messages','PATCH', JSON.stringify({  messageIds: messageIds,
            command: 'addLabel',
            label: selectedLabel}));
    }

    getSelected = () =>{
        return this.state.messages.filter(message => {
                return message.selected === true
            }
        );
    }
    renderForm = () =>{
        if(this.state.showComposeForm ){
            return (
                <ComposeForm addMessage={this.addMessage}></ComposeForm>
            )
        }
    }
    getSelectedIds = () =>{
        const messageIds = [];
        this.state.messages.filter(message => {
            messageIds.push(message.id)
            }
        )
        return messageIds;
    }
    toggleShowComposedForm = () => {
        this.setState({showComposeForm: !this.state.showComposeForm})
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:8081/api/messages')
        const json = await response.json()
        this.setState({messages: json._embedded.messages})
    }

    render() {
        return (
            <div className="App">
                <div className="row toolbar">
                    <div className="col-md-12">
                        <p className="pull-right">
                            <span className="badge badge">{this.countUnread()}</span>
                            unread message{(this.countUnread() > 1) ? "s" : "" }
                        </p>

                        <a className="btn btn-danger" onClick={this.toggleShowComposedForm}>
                            <i className="fa fa-plus"></i>
                        </a>

                        <button className="btn btn-default" onClick={this.selectButtonHandler}>
                            <i className={this.selectAllState()}></i>
                        </button>

                        <button className="btn btn-default" disabled={this.isDisabled()}
                                onClick={this.markAsRead}>
                            Mark As Read
                        </button>

                        <button className="btn btn-default" disabled={this.isDisabled()}
                                onClick={this.markAsUnread}>
                            Mark As Unread
                        </button>

                        <select className="form-control label-select" disabled={this.isDisabled()} onChange={this.addLabel}>
                            <option>Apply label</option>
                            <option value="dev">dev</option>
                            <option value="personal">personal</option>
                            <option value="gschool">gschool</option>
                        </select>

                        <select className="form-control label-select" disabled={this.isDisabled()} onChange={this.removeLabelFromSelected}>
                            <option>Remove label</option>
                            <option value="dev">dev</option>
                            <option value="personal">personal</option>
                            <option value="gschool">gschool</option>
                        </select>

                        <button className="btn btn-default" disabled={this.isDisabled()} onClick={this.deleteSelected}>
                            <i className="fa fa-trash-o"></i>
                        </button>
                    </div>
                </div>
                {this.renderForm() }
                <Messages messages={this.state.messages} selectHandler={this.selectHandler} favoriteHandler={this.favoriteHandler}/>
            </div>
        );
    }
}

export default App;

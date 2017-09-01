import React, {Component} from 'react';
import logo from './logo.svg';
import Messages from './Messages';
import './App.css';
import * as data from './seedData';

class App extends Component {

    selectButtonHandler= () => {
        if (this.state.messages.filter(message => !message.selected).length === 0 ){
            this.setState(this.state.messages.map(message => message.selected = false))
        }
        else{
            this.setState(this.state.messages.map(message => message.selected = true))
        }
    };

    filterSelected=() => {
        return this.state.messages.filter(message => !message.selected);
    }

    constructor(props) {
        super(props)
        this.state = {messages: data.seedData}
    }

    countUnread = () => {
        let unread = this.state.messages.filter(message =>
            message.read === false
        )
        return unread.length
    };

    deleteSelected = () => {
        const messages = this.filterSelected()
        this.setState({ messages })
    }

    selectHandler = (id) => {
        this.setState(this.toggleSelectOnId(id))
    }
    favoriteHandler = (id) => {
        this.setState(this.toggleFavoriteOnId(id))
    }

    toggleSelectOnId(id) {
        return this.state.messages.map((message) => message.id === id ? this.toggleSelected(message) : message);
    }
    toggleFavoriteOnId(id) {
        return this.state.messages.map((message) => message.id === id ? this.toggleFavorite(message) : message);
    }

    toggleSelected(message) {
        message.selected = message.selected ? false : true;
        return message;
    }
    toggleFavorite(message) {
        message.starred = message.starred ? false : true;
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

    setReadStatus(status) {
        this.setState(this.state.messages.map((message) => {
            message.selected === true ? message.read = status : message.selected
            return message;
        }))
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
    removeLabel = (e) => {
        const selectedLabel = e.target.value
        const messages = this.state.messages.map(message => message.selected ?
            {... message , labels: message.labels.filter(label => label !== selectedLabel)} : message)
        this.setState({messages});
    }

    addLabel = (e) => {
        const selectedLabel = e.target.value
        const messages = this.state.messages.map(message => message.selected && !message.labels.includes(selectedLabel)
            ?  {... message , labels: message.labels.concat(selectedLabel)} : message)
        this.setState({messages});
    }

    getSelected() {
        return this.state.messages.filter(message => {
                return message.selected === true
            }
        );
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

                        <select className="form-control label-select" disabled={this.isDisabled()} onChange={this.removeLabel}>
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
                <Messages messages={this.state.messages} selectHandler={this.selectHandler} favoriteHandler={this.favoriteHandler}/>
            </div>
        );
    }
}

export default App;

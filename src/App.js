import React, {Component} from 'react';
import logo from './logo.svg';
import Messages from './Messages';
import './App.css';
import * as data from './seedData';

class App extends Component {

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

                        <button className="btn btn-default">
                            <i className="fa fa-square-o"></i>
                        </button>

                        <button className="btn btn-default" disabled={(this.countSelected() === 0) ? "disabled" : ""}
                                onClick={this.markAsRead}>
                            Mark As Read
                        </button>

                        <button className="btn btn-default" disabled={(this.countSelected() === 0) ? "disabled" : ""}
                                onClick={this.markAsUnread}>
                            Mark As Unread
                        </button>

                        <select className="form-control label-select" disabled="disabled">
                            <option>Apply label</option>
                            <option value="dev">dev</option>
                            <option value="personal">personal</option>
                            <option value="gschool">gschool</option>
                        </select>

                        <select className="form-control label-select" disabled="disabled">
                            <option>Remove label</option>
                            <option value="dev">dev</option>
                            <option value="personal">personal</option>
                            <option value="gschool">gschool</option>
                        </select>

                        <button className="btn btn-default" disabled="disabled">
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

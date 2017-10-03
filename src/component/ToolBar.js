import React, {Component} from 'react';
import ComposeForm from './ComposeForm';
import { bindActionCreators } from 'redux'
import '../App.css';
import { connect } from 'react-redux'
import {toggleDisplayForm, deleteMessages, toggleSelected, selectAll, toggleFavorite, addLabel, deleteLabel, markRead,
} from "../actions/index";

class ToolBar extends Component {

    constructor(props) {
        super(props)
        this.state = {messages: [], showComposeForm: false}
    }

    countUnread = () => {
        let unread = this.props.messages.filter(message =>
            message.read === false
        )
        return unread.length
    };

    deleteSelected = () => {
        const messageIds = this.getSelectedIds();
        this.props.deleteMessages(messageIds);
    }

    countSelected = () => {
        return this.getSelected().length
    }

    selectAllState = () => {
        if (this.countSelected() === 0){
            return "fa fa-square-o";
        }
        else if (this.countSelected() === this.props.messages.length){
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
        let messageIds = this.getSelectedIds()
        this.props.markRead(messageIds, status);
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

    removeLabelFromSelected = (e) => {
        const selectedLabel = e.target.value
        let messageIds = this.getSelectedIds()
        this.props.deleteLabel(messageIds,selectedLabel)
    }

    addMessage = async(subject, body) =>{
        this.props.addMessage(subject,body)
    }

    addLabel = (e) => {
        let messageIds = this.getSelectedIds();
        const selectedLabel = e.target.value
        this.props.addLabel(messageIds,selectedLabel);
    }

    getSelected = () =>{
        return this.props.messages.filter(message => {
                return message.selected === true
            }
        );
    }
    getSelectedIds = () =>{
        const messageIds = [];
        const selectedMessages = this.getSelected();
        selectedMessages.forEach(message => messageIds.push(message.id))
        return messageIds;
    }
    render() {
        return (
            <div className="ToolBar">
                <div className="row toolbar">
                    <div className="col-md-12">
                        <p className="pull-right">
                            <span className="badge badge">{this.countUnread()}</span>
                            unread message{(this.countUnread() > 1) ? "s" : "" }
                        </p>

                        <a className="btn btn-danger" onClick={this.props.toggleDisplayForm}>
                            <i className="fa fa-plus"></i>
                        </a>

                        <button className="btn btn-default" onClick={this.props.selectAll}>
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
                <ComposeForm/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    messages: state.messages.messages,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleDisplayForm: toggleDisplayForm,
    deleteMessages: deleteMessages,
    toggleSelected: toggleSelected,
    selectAll: selectAll,
    toggleFavorite: toggleFavorite,
    addLabel: addLabel,
    deleteLabel: deleteLabel,
    markRead: markRead,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ToolBar)

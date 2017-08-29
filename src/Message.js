import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';


const Message = ({id ,subject, read, starred, labels, selected, selectHandler, favoriteHandler}) => {
    // renderLabels = () =>{
    this.lenderLabels = function () {
        return(
            labels.map((label, index) => {
                return <span key={index} className="label label-warning">{label}</span>

            })
        )
    }
    this.messageSelectHandler = function () {
        selectHandler(id)
    }
    this.messageFavoriteHandler = function () {
        favoriteHandler(id)
    }
    this.isRead = function () {
        if (read) {
           return " read"
        } else {
           return " unread"
        }
    }
    this.isSelected = function () {
        if (selected) {
            return " selected"
        } else {
            return ""
        }
    }


    return (

    <div className={ "row message" +  this.isRead() +  this.isSelected()}>
        <div className="col-xs-1">
            <div className="row">
                <div className="col-xs-2">
                    <input type="checkbox" checked={selected ? "checked" : ""} onChange={this.messageSelectHandler}/>
                </div>
                <div className="col-xs-2">
                    <i className={starred ? "star fa fa-star" : `star fa fa-star-o` } onClick={this.messageFavoriteHandler}></i>
                </div>
            </div>
        </div>
        <div className="col-xs-11">
            {this.lenderLabels()}
            <a href="#">
                {subject}
            </a>
        </div>
    </div>


    );
}


export default Message;

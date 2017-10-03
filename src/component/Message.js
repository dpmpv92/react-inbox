import React from 'react';
import {toggleSelected, toggleFavorite} from "../actions/index";
import bindActionCreators from "redux/es/bindActionCreators";
import {connect} from "react-redux";


const Message = ({id ,subject, read, starred, labels, selected, toggleSelected, toggleFavorite}) => {
    const lenderLabels = () => {
        return(
            labels.map((label, index) => {
                return <span key={index} className="label label-warning">{label}</span>

            })
        )
    }
    const isRead = () => {
        if (read) {
           return " read"
        } else {
           return " unread"
        }
    }
    const isSelected = () => {
        if (selected) {
            return " selected"
        } else {
            return ""
        }
    }
    const selectClickHanlder =() => {
        toggleSelected(id)
    }
    const favoriteClickHandler = () => {
        toggleFavorite({id ,subject, read, starred, labels, selected})
    }


    return (

    <div className={ "row message" +  isRead() +  isSelected()}>
        <div className="col-xs-1">
            <div className="row">
                <div className="col-xs-2">
                    <input type="checkbox" checked={selected ? "checked" : ""} onChange={selectClickHanlder}/>
                </div>
                <div className="col-xs-2">
                    <i className={starred ? "star fa fa-star" : `star fa fa-star-o` } onClick={favoriteClickHandler}></i>
                </div>
            </div>
        </div>
        <div className="col-xs-11">
            {lenderLabels()}
            <a href="#">
                {subject}
            </a>
        </div>
    </div>


    );
}

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleSelected: toggleSelected,
    toggleFavorite: toggleFavorite,
}, dispatch)

export default connect(
    null,
    mapDispatchToProps
)(Message)

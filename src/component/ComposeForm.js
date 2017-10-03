import React from 'react';
import {addMessage} from "../actions/index";
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";

const ComposeForm = ({displayComposedForm, addMessage}) => {

    const addMessageClickHandler = (e) => {
        e.preventDefault();
        addMessage(e.target.subject.value, e.target.body.value)
    }

    const renderForm = () =>{
        if ( displayComposedForm ){
           return (
               <form className="form-horizontal well" onSubmit={addMessageClickHandler}>
                   <div className="form-group">
                       <div className="col-sm-8 col-sm-offset-2">
                           <h4>Compose Message</h4>
                       </div>
                   </div>
                   <div className="form-group">
                       <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
                       <div className="col-sm-8">
                           <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject"/>
                       </div>
                   </div>
                   <div className="form-group">
                       <label htmlFor="body" className="col-sm-2 control-label">Body</label>
                       <div className="col-sm-8">
                           <textarea name="body" id="body" className="form-control"></textarea>
                       </div>
                   </div>
                   <div className="form-group">
                       <div className="col-sm-8 col-sm-offset-2">
                           <input type="submit" value="Send" className="btn btn-primary"/>
                       </div>
                   </div>
               </form>
           )
        }
        else
            return null

    }

    return (
        renderForm()
    );
}

const mapStateToProps = state => ({
    displayComposedForm: state.displayComposedForm.displayComposedForm,

})

const mapDispatchToProps = dispatch => bindActionCreators({
    addMessage: addMessage,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ComposeForm)

import { combineReducers } from 'redux'
import {TOGGLE_DISPLAY_FORM, DELETE_MESSAGES, TOGGLE_SELECTED, SELECT_ALL, TOGGLE_FAVORITE, ADD_LABEL, DELETE_LABEL,
    MARK_READ, ADD_MESSAGE, MESSAGES_RECEIVED
} from "../actions/index";

function messages(state = { messages: [] }, action) {

    const setSelected = (message, value) =>{
        return {...message, selected: value}
    }
    const setSelectedOnAll = (messages, value) =>{
       return messages.map(message => setSelected(message,value));
    }
    const isAllSelected = (messages) =>{
        return (messages.filter(message => !message.selected).length === 0 )
    }

    const filterLabelFromMessage = (message, selectedLabel) => {
        return ({...message, labels: message.labels.filter(label => label !== selectedLabel)});
    }

    const addLabelToMessage = (message, selectedLabel) => {
        return ({...message, labels: message.labels.concat(selectedLabel)});
    }

    switch (action.type) {
        case MESSAGES_RECEIVED:
            return {
                ...state,
                messages: action.messages
            }
        case DELETE_MESSAGES:
            return {
                ...state,
                messages: state.messages.filter(message => !message.selected)
            }
        case TOGGLE_SELECTED:
            return {
                ...state,
                messages: state.messages.map(message => message.id === action.messages ? {...message , selected: !message.selected} : message)
            }
        case TOGGLE_FAVORITE:
            return {
                ...state,
                messages: state.messages.map(message => message.id === action.messages.id ? {...message, starred: !message.starred} : message)
            }
        case SELECT_ALL:
            return {
                ...state,
                messages: isAllSelected(state.messages) ? setSelectedOnAll(state.messages,false) : setSelectedOnAll(state.messages, true)
            }
        case DELETE_LABEL:
            return{
                ...state,
                messages:  state.messages.map(message => message.selected ?
                    filterLabelFromMessage(message,action.label) : message)
            }
        case ADD_LABEL:
            return{
                ...state,
                messages: state.messages.map(message => message.selected ?
                    addLabelToMessage(message,action.label) : message)
            }
        case MARK_READ:
            return{
                ...state,
                messages: state.messages.map(message => message.selected ?
                    {...message, read:action.status} : message)
            }
        case ADD_MESSAGE:
            return{
                ...state,
                messages: state.messages.concat(action.message)
            }
        default:
            return state
    }
}

function displayComposedForm(state = { displayComposedForm: false }, action) {
    switch (action.type) {
        case TOGGLE_DISPLAY_FORM:
            return {
                ...state,
                displayComposedForm: !state.displayComposedForm
            }
        default:
            return state
    }
}

export default combineReducers({
    messages,
    displayComposedForm,
})
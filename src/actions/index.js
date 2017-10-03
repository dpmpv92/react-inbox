const makeApiCall = (body, method = "PATCH", path = "http://localhost:8081/api/messages" ) => {
    fetch(path, {
        method: method,
        body: body,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
}
const makeApiCallWithResponse = async(body, method = "POST", path = "http://localhost:8081/api/messages" ) => {
    let response = await fetch(path, {
        method: method,
        body: body,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
    return await response.json();
}
export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED'
export function fetchMessages() {
    return async (dispatch) => {
        const response = await fetch(`http://localhost:8081/api/messages`)
        const json = await response.json()
        dispatch({
            type: MESSAGES_RECEIVED,
            messages: json._embedded.messages
        })
    }
}
export const TOGGLE_DISPLAY_FORM = 'TOGGLE_DISPLAY_FORM'
export function toggleDisplayForm() {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_DISPLAY_FORM,
        })
    }
}
export const TOGGLE_SELECTED = 'TOGGLE_SELECTED'
export function toggleSelected(messageId) {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_SELECTED,
            messages: messageId
        })
    }
}
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE'
export function toggleFavorite(message) {
    let body = JSON.stringify({messageIds: [message.id],
        command: 'star',
        star: !message.starred});
    makeApiCall(body)
    return (dispatch) => {
        dispatch({
            type: TOGGLE_FAVORITE,
            messages: message
        })
    }
}
export const SELECT_ALL = 'SELECT_ALL'
export function selectAll() {
    return (dispatch) => {
        dispatch({
            type: SELECT_ALL,
        })
    }
}
export const DELETE_MESSAGES = 'DELETE_MESSAGES'
export function deleteMessages(messageIds) {
    return async (dispatch) => {
        makeApiCall(JSON.stringify({ messageIds: [messageIds], command: 'delete',}))
        dispatch({
            type: DELETE_MESSAGES,
            messages: [messageIds],
        })
    }
}
export const DELETE_LABEL = 'DELETE_LABEL'
export function deleteLabel(messageIds,label) {
    return async (dispatch) => {
        makeApiCall(JSON.stringify({ messageIds: [messageIds], command: 'removeLabel', label: label}))
        dispatch({
            type: DELETE_LABEL,
            label: label
        })
    }
}
export const ADD_LABEL = 'ADD_LABEL'
export function addLabel(messageIds,label) {
    return async (dispatch) => {
        makeApiCall(JSON.stringify({ messageIds: [messageIds], command: 'addLabel', label: label}))
        dispatch({
            type: ADD_LABEL,
            label: label
        })
    }
}
export const MARK_READ = 'MARK_READ'
export function markRead(messageIds, status) {
    return async (dispatch) => {
        makeApiCall(JSON.stringify({  messageIds: messageIds,
                command: 'read',
                read: status,}))
        dispatch({
            type: MARK_READ,
            status: status
        })
    }
}
export const ADD_MESSAGE = 'ADD_MESSAGE'
export function addMessage(subject, body) {
    return async (dispatch) => {
            const newMessage = await makeApiCallWithResponse(JSON.stringify({subject: subject, body: body}))
        dispatch({
            type: ADD_MESSAGE,
            message: newMessage
        })
    }
}
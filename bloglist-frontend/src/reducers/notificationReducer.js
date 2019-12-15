const initialState = { text: '', isError: false }

export const setNotification = (text, isError, sec) => {
    return dispatch => {
        dispatch({
            type: 'SET_NOTIF',
            data: { text, isError }
        })
        setTimeout(() => {
            dispatch(resetNotification())
        }, sec * 1000)
    }
}

export const resetNotification = () => {
    return {
        type: 'RESET_NOTIF'
    }
}

const notificationReducer = (state = initialState, action) => {
    console.log('notificationReducer', state, action)
    switch (action.type) {
        case 'SET_NOTIF':
            return action.data
        case 'RESET_NOTIF':
            return ''
        default:
            return state
    }
}


export default notificationReducer
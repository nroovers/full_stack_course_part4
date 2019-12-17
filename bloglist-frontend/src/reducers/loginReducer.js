import blogsService from '../services/blogs'


export const setLogin = (user) => {
    return dispatch => {
        // console.log('dispatch setLogin', user)
        blogsService.setToken(user.token)
        dispatch({
            type: 'SET_LOGIN',
            data: user
        })
    }
}

export const resetLogin = () => {
    return dispatch => {
        blogsService.setToken('')
        dispatch({
            type: 'RESET_LOGIN'
        })
    }
}

const loginReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_LOGIN':
            return action.data
        case 'RESET_LOGIN':
            return null
        default:
            return state
    }
}

export default loginReducer
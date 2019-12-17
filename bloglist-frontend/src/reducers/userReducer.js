import usersService from '../services/users'

const initialState = []

export const initializeUsers = () => {
    return async dispatch => {
        const users = await usersService.getAll()
        dispatch({
            type: 'INIT_USERS',
            data: users,
        })
    }
}

// export const createUser = ({ username, password }) => {
//     return async dispatch => {
//         const createdUser = await usersService.create({ username, password })
//         dispatch({
//             type: 'NEW_USER',
//             data: createdUser
//         })
//     }
// }

const userReducer = (state = initialState, action) => {
    console.log('userReducer', state, action)
    switch (action.type) {
        case 'INIT_USERS':
            return action.data
        // case 'NEW_USER':
        //     return state.concat(action.data)
        default:
            return state
    }
}

export default userReducer
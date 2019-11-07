const initialState = {
    cookies: {
        isFetching: false,
        value: null
    },
    authorization: {
        isFetching: false,
        status: false,
        error: ''
    },
    profile: {
        isFetching: false,
        name: null
    }
}

const profile = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_COOKIES': return {
            ...state,
            cookies: { isFetching: true, value: null }
        }
        case 'RECEIVE_COOKIES': return {
            ...state,
            cookies: { isFetching: true, value: action.cookies }
        }
        case 'SIGNING_IN': return {
            ...state,
            authorization: { isFetching: true, status: false, error: '' }
        }
        case 'SIGNED_IN': return {
            ...state,
            authorization: { isFetching: false, status: true, error: '' },
            profile: { isFetching: false, name: action.user }
        }
        case 'SIGNING_ERROR': return {
            ...state,
            authorization: { isFetching: false, status: false, error: 'Ошибка авторизации' },
            profile: { isFetching: false, name: null }
        }
        case 'SIGN_OUT':
            return initialState
        default:
            return state;
    }
}


export default profile
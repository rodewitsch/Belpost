

const initialState = {
    cookies: {
        isFetching: false,
        value: null
    },
    authorization: {
        isFetching: false,
        status: false
    },
    profile: {
        isFetching: false,
        name: null
    }
}

const profile = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_COOKIES': ({
            ...state,
            cookies: { isFetching: true, value: null }
        })
        case 'RECEIVE_COOKIES': ({
            ...state,
            cookies: { isFetching: false, value: action.cookies }
        })
        case 'SIGN_IN': ({
            ...state,
            authorization: { status: true },
            profile: { name: action.name }
        })
        case 'SIGN_OUT':
            return initialState
        default:
            return state;
    }
}


export default profile
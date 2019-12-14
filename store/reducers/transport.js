const initialState = {
    cookies: {
        isFetching: false,
        value: null
    },
    hiddenFields: {
        __VIEWSTATE: null,
        __EVENTVALIDATION: null,
        __VIEWSTATEGENERATOR: null
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_COOKIES': return {
            ...state,
            cookies: { isFetching: true, value: null }
        }
        case 'RECEIVE_COOKIES': return {
            ...state,
            cookies: { isFetching: false, value: action.cookies }
        }
        case 'SET_HIDDEN_FIELDS': return {
            ...state,
            hiddenFields: {
                __VIEWSTATE: action.fields.__VIEWSTATE,
                __EVENTVALIDATION: action.fields.__EVENTVALIDATION,
                __VIEWSTATEGENERATOR: action.fields.__VIEWSTATEGENERATOR
            }
        }
        default:
            return state;
    }
}
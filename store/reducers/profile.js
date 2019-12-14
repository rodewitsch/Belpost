const initialState = {
    authorization: {
        isFetching: false,
        status: false,
        error: ''
    },
    profile: {
        isFetching: false,
        name: null
    },
    addresses: {
        isFetching: false,
        selected: 0,
        array: [
            { label: 'test test test test test test', value: 0 },
            { label: 'test test test test test test test test test test test test', value: 1 }
        ]
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
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
        case 'SELECTING_ADDRESS': return {
            ...state,
            addresses: { ...state.addresses, selected: action.selected }
        }
        case 'DELETING_ADDRESS': return {
            ...state,
            addresses: {
                ...state.addresses,
                array: state.addresses.array.reduce((acc, item) => {
                    if (item.value != action.deleted) acc.push(item);
                    return acc;
                }, [])
            }
        }
        case 'SIGN_OUT':
            return initialState
        default:
            return state;
    }
}
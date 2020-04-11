const initialState = {
    tracks: {
        isFetching: false,
        array: []
    },
    archive: {
        isFetching: false,
        array: []
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_TRACKS': return {
            ...state,
            tracks: { isFetching: true, array: [] }
        }
        case 'RECEIVE_TRACKS': return {
            ...state,
            tracks: { isFetching: false, array: action.tracks }
        }
        case 'REQUEST_TRACK_HISTORY': return {
            ...state,
            tracks: {
                ...state.tracks,
                isFetching: true
            }
        }
        case 'RECEIVE_TRACK_HISTORY': return {
            ...state,
            tracks: {
                isFetching: false,
                array: state.tracks.array.reduce((acc, item, index) => {
                    if (index != action.index) acc.push(item);
                    if (index == action.index) acc.push({ ...item, history: action.history })
                    return acc
                }, []),

            }
        }
        case 'REQUEST_ARCHIVE': return {
            ...state,
            archive: { isFetching: true, array: [] }
        }
        case 'RECEIVE_ARCHIVE': return {
            ...state,
            archive: { isFetching: false, array: action.archive }
        }
        default:
            return state;
    }
}


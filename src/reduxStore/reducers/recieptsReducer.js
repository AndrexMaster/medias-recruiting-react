const SET_RECEIPTS = 'SET_RECEIPTS'

const initialState = {
    receipts: []
}

export const recieptsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_RECEIPTS :
            return {...state, receipts: action.payload};

        default:
            return state;
    }
};
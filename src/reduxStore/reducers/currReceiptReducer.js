const SET_CURR_RECEIPT_ID = 'SET_CURR_RECEIPT_ID'
const SET_RECEIPT_EDIT_STATUS = 'SET_RECEIPT_EDIT_STATUS'
const SET_PRODUCTS_IN_RECEIPT = 'SET_PRODUCTS_IN_RECEIPT'

const initialState = {
    isReceiptEditing: false,
    receiptId: 0,
    productsInReceipt: []
}

export const currReceiptReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURR_RECEIPT_ID :
            return {...state, receiptId: action.payload};

        case SET_RECEIPT_EDIT_STATUS :
            return {...state, isReceiptEditing: action.payload};

        case SET_PRODUCTS_IN_RECEIPT :
            return {...state, productsInReceipt: action.payload};

        default:
            return state;
    }
};
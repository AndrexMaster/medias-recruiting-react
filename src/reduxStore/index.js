import { createStore, combineReducers } from "redux";
import { currReceiptReducer } from './reducers/currReceiptReducer';
import { recieptsReducer } from './reducers/recieptsReducer';


const rootReducer = combineReducers({
    currReceiptReducer,
    recieptsReducer,
})

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
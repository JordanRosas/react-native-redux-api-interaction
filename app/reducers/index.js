import { combineReducers } from 'redux'

// Import the action types constant we defined in the actions folder
import { DATA_AVAILABLE } from '../actions'

let dataState = { data:[], loading:true }

const dataReducer = (state=dataState, action) => {
    switch(action.type){
        case DATA_AVAILABLE:
            state=Object.assign({}, state, {data: action.data, loading:false});
            return state;
            default:
                return state;
    }
}

// combine reducers

const rootReducer = combineReducers({
    dataReducer
    // ANOTHER REDUCER
    // ANOTHER REDUCER
})

export default rootReducer
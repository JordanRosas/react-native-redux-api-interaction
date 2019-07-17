import { combineReducers } from 'redux';
import { QUOTES_AVAILABLE, ADD_QUOTE, UPDATE_QUOTE, DELETE_QUOTE } from "../actions/";

let dataState = {quotes:[], loading:true};

const dataReducer = (state = dataState, action) => {
    switch(action.type){
        case ADD_QUOTE:{
            let quotes = cloneObject(state.quotes) //Clone the current state
            quotes.unshift(action.quote); //Add new quote to the top
            state = Object.assign({}, state, {quotes:quotes});
            return state;
        }
        case QUOTES_AVAILABLE:{
            state = Object.assign({}, state, { quotes: action.quotes, loading:false })
            return state
        }
        case UPDATE_QUOTE:{
            let quote = action.quote;
            let quotes = cloneObject(state.quotes) //Clone current State
            let index = getIndex(quotes, quote.id);
            if(index !== -1){
                quotes[index]['author'] = quote.author;
                quotes[index]['text'] = quote.text;
            }
            state = Object.assign({}, state, {quotes:quotes});
            return state;
        }
        case DELETE_QUOTE:{
            let quotes = cloneObject(state.quotes)
            let index = getIndex(quotes, quote.id)
            if(index !== -1) quotes.splice(index, 1)
            state = Object.assign({}, state, { quotes:quotes })
            return state;
        }
        default:
            return state
    }
};

function cloneObject(object){
    return JSON.parse(JSON.stringify(object));
}

function getIndex(data, id){
    let clone = JSON.parse(JSON.stringify(data));
    return clone.findIndex((obj) => parseInt(obj.id) === parseInt(id));
}

const rootReducer = combineReducers({
    dataReducer
})

export default rootReducer
export const QUOTES_AVAILABLE = "QUOTES_AVAILABLE";
export const ADD_QUOTE = " ADD_QUOTE";
export const UPDATE_QUOTE = "UPDATE_QUOTE";
export const DELETE_QUOTE = "DELETE_QUOTE";

import {AsyncStorage} from 'react-native';

// Add a quote => POST
export function addQuote(quote){
    return(dispatch) => {
        AsyncStorage.getItem('data', (err, quotes) => {
            if(quotes !== null ){
                quotes = JSON.parse(quotes);
                // adding new quote to the beginning of the quotes array
                quotes.unshift(quote);
                AsyncStorage.setItem('data', JSON.stringify(quotes), () => {
                    dispatch({type:ADD_QUOTE, quote:quote})
                });
            }
        });
    };
}
// Read Quotes
export function getQuotes(){
    return(dispatch) => {
        AsyncStorage.getItem('data', (err, quotes) => {
            if(quotes !== null){
                dispatch({type:QUOTES_AVAILABLE, quotes: JSON.parse(quotes)})
            }
        })
    }
}

// Update Quote
export function updateQuote(quote){
    return(dispatch) => {
        AsyncStorage.getItem('data', (err, quotes) => {
            if(quotes !== null){
                quotes = JSON.parse(quotes);
                var quoteIndex = getIndex(quotes, quote.id);
                if(quoteIndex !== -1){
                    quotes[quoteIndex]['author'] = quote.author;
                    quotes[quoteIndex]['quote'] = quote.quote;
                }
                AsyncStorage.setItem('data', JSON.stringify(quotes),  () => {
                    dispatch({type: UPDATE_QUOTE, quote:quote})
                });
            }
        });
    };
}

// DELETE Quote
export function deleteQuote(id){
    return(dispatch) => {
        AsyncStorage.getItem('data', (err, quotes) => {
            if(quotes !== null){
                quotes = JSON.parse(quotes);

                var index = getIndex(quotes, id);
                if(index !== -1) quotes.splice(index, 1);
                AsyncStorage.setItem('data', JSON.stringify(quotes), () => {
                    dispatch({type:DELETE_QUOTE, id:id});
                });
            }
        });
    };
}

function getIndex(data, id){
    let clone = JSON.parse(JSON.stringify(data));
    return clone.findIndex((obj) => parseInt(obj.id) === parseInt(id))
}
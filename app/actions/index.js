export const DATA_AVAILABLE = "DATA_AVAILABLE";

// IMPORT SAMPLE DATA
import Data from '../instructions.json';

export function getData(){
    return (dispatch) => {
        // Make the API call
        setTimeout(() => {
            const data = Data.instructions;
            dispatch({type:DATA_AVAILABLE, data:data})
        }, 2000)
    }
}
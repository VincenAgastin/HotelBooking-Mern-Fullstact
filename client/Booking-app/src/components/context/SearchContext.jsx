import { createContext, useReducer } from "react";

const INITIAL_STATE = {
    city: undefined,
    dates: [],
    options: {
        adult: 1,  
        children: 0,  
        room: 1,  
    },
};

const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
    switch (action.type) {
        case "NEW_SEARCH":
            return { ...state, ...action.payload };  
        case "RESET_SEARCH":
            return INITIAL_STATE; 
        default:
            return state; 
    }
};

const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

    return (
        <SearchContext.Provider value={{
            city: state.city,
            dates: state.dates,
            options: state.options,
            dispatch, 
        }}>
            {children}
        </SearchContext.Provider>
    );
};

export { SearchContext, SearchContextProvider }; 

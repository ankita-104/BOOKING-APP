// We are creatting this context api to pass the search section values to different children components. city,dates,options are the payloads for the search

import { createContext, useReducer } from "react";

const INITIAL_STATE={
    city:undefined,
    dates:[],
    options:{
        adult:undefined,
        children:undefined,
        room:undefined,
    }
}

export const SearchContext = createContext(INITIAL_STATE
);

const SearchReducer = (state,action) =>{
    switch(action.type){
        case "NEW_SEARCH":
            return action.payload;
        case "RESET_SEARCH":
            return INITIAL_STATE;
        default:
            return state;
    }
};
//basicallyu here, the children are the componennts that we want to reach  using the payloads or datas.   
export const SearchContextProvider = ({children}) =>{  
const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
return (
    <SearchContext.Provider value={{city:state.city, dates:state.dates, options: state.options, dispatch}}>
        {children}
    </SearchContext.Provider>
)
}

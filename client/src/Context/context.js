import React, {useState, createContext} from 'react'

export const CounterContext = createContext();

export const CounterContextProvider = props =>
{
    const [globalState, setGlobalState] = useState({conversations:{}})
    

    return(
        <CounterContext.Provider value={[globalState,setGlobalState]}>
            {props.children}
        </CounterContext.Provider>
    )
}
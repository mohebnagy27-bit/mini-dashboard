import { createContext , useReducer } from "react";
import selectedbtn from "../reducers/showdata-reducer";

export const Reducercontext = createContext();

export function Reducerprovider ({children}){
    const [btnselected, btnselecteddispatch] = useReducer(selectedbtn, "none");

    return (
        <Reducercontext.Provider value = {{btnselected , btnselecteddispatch}}>
            {children}
        </Reducercontext.Provider>
    )
    
}
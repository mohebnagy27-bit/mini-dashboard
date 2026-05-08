import { createContext, useState } from "react";


export const Examcontext = createContext();


export function Examprovider ({children}){
    const [examlist , examlistset] = useState(() => {
        const savedexams = localStorage.getItem("examlist");
        return savedexams ? JSON.parse(savedexams) : [];
    })

    return (
        <Examcontext.Provider value = {{examlist, examlistset}}>
            {children}
        </Examcontext.Provider>
    ) 
}
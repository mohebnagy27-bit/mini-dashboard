import { createContext, useState } from "react";


export const Taskcontext = createContext();


export function Taskprovider ({children}){
    const [tasklist , tasklistset] = useState(() => {
        const savedtasks = localStorage.getItem("tasklist");
        return savedtasks ? JSON.parse(savedtasks) : [];
    })

    return (
        <Taskcontext.Provider value = {{tasklist, tasklistset}}>
            {children}
        </Taskcontext.Provider>
    ) 
}
import React, {createContext, useState} from "react";

export const NameContext = createContext();

export const NameProvider = ({children}) => {
    const [name, setName] = useState("");
    const [names, setNames] = useState([]);

    return (
        <NameContext.Provider value={{name, setName, names, setNames}}>
            {children}
        </NameContext.Provider>
    )
}
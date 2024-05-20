import { createContext, useContext, useState } from "react";
import { ReactNode } from 'react';

const SaveContext = createContext({});

interface SaveProviderProps {
    children: ReactNode
}

export const SaveProvider = ({children}: SaveProviderProps) => {
    const [selectedSave, setSelectedSave] = useState({
        name: "",
        date: "",
        path: "",
        description: "",
        isBackup: false
    });

    return (
        <SaveContext.Provider value={{selectedSave, setSelectedSave}}>
            {children}
        </SaveContext.Provider>
    );
}

export const SaveState = () => {
    return useContext(SaveContext);
};

export default SaveProvider;

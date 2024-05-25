import { createContext, useContext, useState } from "react";
import { ReactNode } from 'react';

const SaveContext = createContext({});

interface SaveProviderProps {
    children: ReactNode
}

export const SaveProvider = ({children}: SaveProviderProps) => {
    const [selectedBackup, setSelectedBackup] = useState({
        name: "",
        date: "",
        path: "",
        isBackup: false
    });
    const [windowOnTop , setWindowOnTop] = useState(false);
    const [backupList, setBackupList] = useState<object[]>([]);

    return (
        <SaveContext.Provider value={{selectedBackup, setSelectedBackup, backupList, setBackupList, windowOnTop, setWindowOnTop}}>
            {children}
        </SaveContext.Provider>
    );
}

export const SaveState = () => {
    return useContext(SaveContext);
};

export default SaveProvider;

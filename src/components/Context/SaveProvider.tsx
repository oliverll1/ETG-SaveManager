import { createContext, useContext, useState } from "react";
import { ReactNode } from 'react';

const SaveContext = createContext({});

interface SaveProviderProps {
    children: ReactNode
}

export interface ISaveState {
    selectedBackup: IBackup
    setSelectedBackup: React.Dispatch<React.SetStateAction<IBackup>>
    backupList: IBackup[]
    setBackupList: React.Dispatch<React.SetStateAction<IBackup[]>>
    windowOnTop: boolean
    setWindowOnTop: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IBackup {
    name: string
    date: string
    path: string
    isBackup: boolean
}

export const SaveProvider = ({children}: SaveProviderProps) => {
    const [selectedBackup, setSelectedBackup] = useState<IBackup>({
        name: "",
        date: "",
        path: "",
        isBackup: false
    });
    const [windowOnTop , setWindowOnTop] = useState(false);
    const [backupList, setBackupList] = useState<IBackup[]>([]);

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

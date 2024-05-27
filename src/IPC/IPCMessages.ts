import { IBackup } from "../components/Context/SaveProvider";

interface IpcAPI {
    saveBackup: ( name: string ) => IBackup;
    loadBackup: ( name: string ) => void;
    deleteBackup: ( name: string ) => void;
    getAllBackups: () => IBackup[];
    getBackup: ( name: string ) => IBackup;
    deleteAllBackups: () => void;
    closeWindow: () => void;
    createBackup: (name: string) => void;
    setAlwaysOnTop: (value: boolean) => void
}

const { saveBackup, loadBackup, deleteBackup, getBackup, getAllBackups, deleteAllBackups, closeWindow, createBackup, setAlwaysOnTop } = window['ipcAPI'] as IpcAPI;

export {
    saveBackup,
    loadBackup,
    deleteBackup,
    getBackup,
    getAllBackups,
    deleteAllBackups,
    closeWindow,
    createBackup,
    setAlwaysOnTop
}

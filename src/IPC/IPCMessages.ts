interface IpcAPI {
    saveBackup: ( name: string ) => object;
    loadBackup: ( name: string ) => void;
    deleteBackup: ( name: string ) => void;
    getAllBackups: () => object[];
    getBackup: ( name: string ) => object;
    deleteAllBackups: () => void;
    closeWindow: () => void;
    createBackup: (name: string) => void;
}

const { saveBackup, loadBackup, deleteBackup, getBackup, getAllBackups, deleteAllBackups, closeWindow, createBackup } = window['ipcAPI'] as IpcAPI;

export {
    saveBackup,
    loadBackup,
    deleteBackup,
    getBackup,
    getAllBackups,
    deleteAllBackups,
    closeWindow,
    createBackup
}

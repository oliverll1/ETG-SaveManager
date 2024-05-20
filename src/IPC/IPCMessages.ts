interface IpcAPI {
    saveBackup: ( name: string ) => void;
    loadBackup: ( name: string ) => void;
    deleteBackup: ( name: string ) => void;
    getAllBackups: () => object[];
    deleteAllBackups: () => void;
    closeWindow: () => void;
    createBackup: (name: string) => void;
}

const { saveBackup, loadBackup, deleteBackup, getAllBackups, deleteAllBackups, closeWindow, createBackup } = window['ipcAPI'] as IpcAPI;

export {
    saveBackup,
    loadBackup,
    deleteBackup,
    getAllBackups,
    deleteAllBackups,
    closeWindow,
    createBackup
}

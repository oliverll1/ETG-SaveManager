interface IpcAPI {
    saveBackup: () => void;
    loadBackup: () => void;
}

const { saveBackup, loadBackup } = window['ipcAPI'] as IpcAPI;

export {
    saveBackup,
    loadBackup
}

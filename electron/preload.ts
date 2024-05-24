import { ipcRenderer, contextBridge } from 'electron';
import { IPCActions } from './IPCActions';
const { SAVE, LOAD, DELETE, GET_ALL, GET_BACKUP, DELETE_ALL, CLOSE, CREATE } = IPCActions.Window;

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },
})

contextBridge.exposeInMainWorld('ipcAPI', {
  saveBackup: (saveName: string) => {
    return new Promise((resolve, reject) => {
      ipcRenderer.once('SAVE_SUCCESS', (event, backup) => {
        resolve(backup);
      });
      ipcRenderer.once('SAVE_ERROR', (event, error) => {
        reject(error);
      });
      ipcRenderer.send(SAVE,  saveName)
    });
  },
  loadBackup: (saveName: string) => {
    ipcRenderer.send(LOAD, saveName)
  },
  deleteBackup: (saveName: string) => {
    ipcRenderer.send(DELETE, saveName)
  },
  getAllBackups: () => {
    return new Promise((resolve, reject) => {
      ipcRenderer.once('GET_ALL_SUCCESS', (event, backups) => {
        resolve(backups);
      });
      ipcRenderer.once('GET_ALL_ERROR', (event, error) => {
        reject(error);
      });
      ipcRenderer.send(GET_ALL);
  });
  },
  getBackup: (saveName: string) => {
    return new Promise((resolve, reject) => {
      ipcRenderer.once('GET_SUCCESS', (event, backup) => {
        resolve(backup);
      });
      ipcRenderer.once('GET_ERROR', (event, error) => {
        reject(error);
      });
      ipcRenderer.send(GET_BACKUP, saveName);
    });
  },
  deleteAllBackups: () => {
    ipcRenderer.send(DELETE_ALL)
  },
  closeWindow: () => {
    ipcRenderer.send(CLOSE)
  },
  createBackup: (saveName: string) => {
    ipcRenderer.send(CREATE, saveName)
  }
})

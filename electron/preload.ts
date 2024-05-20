import { ipcRenderer, contextBridge } from 'electron';
import { IPCActions } from './IPCActions';
const { SAVE, LOAD } = IPCActions.Window;

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
    ipcRenderer.send(SAVE,  saveName)
  },
  loadBackup: (saveName: string) => {
    ipcRenderer.send(LOAD, saveName)
  },
  deleteBackup: (saveName: string) => {
    ipcRenderer.send('DELETE', saveName)
  },
  getAllBackups: () => {
    ipcRenderer.send('GET_ALL')
  },
  deleteAllBackups: () => {
    ipcRenderer.send('DELETE_ALL')
  },
  closeWindow: () => {
    ipcRenderer.send('CLOSE')
  },
  createBackup: (saveName: string) => {
    ipcRenderer.send('CREATE', saveName)
  }
})

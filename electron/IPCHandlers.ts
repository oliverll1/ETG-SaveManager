import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron';
import { IPCActions } from './IPCActions';

const { SAVE, LOAD } = IPCActions.Window;

const handleSave = async (event: IpcMainEvent, arg: string) => {
    console.log("save");
    return "save";   
}

const handleLoad = async (event: IpcMainEvent, arg: string) => {
    
    console.log("load");
    return "load";  
}


interface IpcHandler {
    event: string;
    callback: (event: IpcMainEvent, arg: string) => void
}

const ipcHandlers = [
    { 
        event: SAVE, 
        callback: handleSave
    },
    { 
        event: LOAD, 
        callback: handleLoad
    }
]


export const registerIPCHandlers = () => {
    ipcHandlers.forEach(( handler:IpcHandler ) => {
        ipcMain.on(handler.event, handler.callback)
    })
};
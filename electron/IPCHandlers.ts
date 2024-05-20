import fs from 'fs';
import path from 'path';

import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron';
import { IPCActions } from './IPCActions';

const { SAVE, LOAD, DELETE, GET_ALL, DELETE_ALL, CLOSE, CREATE } = IPCActions.Window;

const handleSave = async (event: IpcMainEvent, arg: string) => {
    console.log(arg);
    return "save";   
}

const handleLoad = async (event: IpcMainEvent, arg: string) => {
    console.log(arg);
    return "load";  
}

const handleDelete = async (event: IpcMainEvent, arg: string) => {
    console.log(arg);
    return "delete";
}

const handleGetAll = async (event: IpcMainEvent, arg: string) => {
    console.log(arg);
    return "getAll";
}   

const handleDeleteAll = async (event: IpcMainEvent, arg: string) => {
    console.log(arg);
    return "deleteAll";
}

const handleClose = async (event: IpcMainEvent) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    console.log('close');
    if (window) {
        window.close();
    }
}

const handleCreate = async (event: IpcMainEvent, name: string) => {
    console.log(name);

    if(!name){
        return 'Name cannot be empty.'
    }

    const folderName = 'backups';
    const fileName = 'backups.json';
    const filePath = path.join(folderName, fileName);

    const data = {
        name: '',
        date: '',
        path: '',
        description: '',
        isBackup: false,
    };

    // Check if the folder exists
    if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);
    }

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify({}), 'utf-8');
    }

    // Parse the JSON backup file
    const fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Check if the entry already exists
    if (Object.keys(fileData).includes(name)) {
        return 'Entry with that name already exists.';
    }

    
    // Add the new entry
    fileData[name] = data;

    // Write the updated JSON file
    fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), 'utf-8');

    return "create";
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
    },
    { 
        event: DELETE, 
        callback: handleDelete
    },
    { 
        event: GET_ALL, 
        callback: handleGetAll
    },
    { 
        event: DELETE_ALL, 
        callback: handleDeleteAll
    },
    { 
        event: CLOSE, 
        callback: handleClose
    },
    { 
        event: CREATE, 
        callback: handleCreate
    }
]


export const registerIPCHandlers = () => {
    ipcHandlers.forEach(( handler:IpcHandler ) => {
        ipcMain.on(handler.event, handler.callback)
    })
};

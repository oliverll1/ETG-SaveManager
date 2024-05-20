import fs from 'fs/promises';
import path from 'path';

import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron';
import { IPCActions } from './IPCActions';
import { createFile } from './utils';

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


const handleCreate = async (event: IpcMainEvent, backupName: string) => {

    if(!backupName){
        return 'Backup name cannot be empty.'
    }

    const folderName = 'backups';
    const fileName = 'backups.json';
    const filePath = path.join(folderName, fileName);
    const backupPath = path.join(folderName, backupName);

    const date = new Date().toLocaleString('en-US', {
        timeZone: 'UTC',
    });
    

    const data = {
        name: backupName,
        date: date,
        path: backupPath,
        isBackup: false,
    };

    try {
        // Check if the folder exists
        await fs.mkdir(folderName, { recursive: true });

        // Create the file if it doesn't exist
        await createFile(filePath);

        // Parse the JSON file
        const fileData = JSON.parse(await fs.readFile(filePath, 'utf-8'));


        // Check if the entry already exists
        if (Object.keys(fileData).includes(backupName)) {
            return 'Entry with that name already exists.';
        }

        // Add the new entry
        fileData[backupName] = data;

        // Write the updated JSON file
        await fs.writeFile(filePath, JSON.stringify(fileData, null, 2), 'utf-8');

        await fs.mkdir(backupPath, { recursive: true });
    } catch (error) {
        console.error(error);
    }
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

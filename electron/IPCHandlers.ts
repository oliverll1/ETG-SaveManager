import fs from 'fs/promises';
import path from 'path';

import os from 'os';

import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron';
import { IPCActions } from './IPCActions';
import { copyDirectory, createFile, removeRegistryKey } from './utils';

const { SAVE, LOAD, DELETE, GET_ALL, GET_BACKUP, DELETE_ALL, CLOSE, CREATE } = IPCActions.Window;

const handleSave = async (event: IpcMainEvent, backupName: string) => {
    try {
        const sourceDir = path.join(os.homedir(), 'AppData', 'LocalLow', 'Dodge Roll', 'Enter the Gungeon');
        copyDirectory(sourceDir, `backups/${backupName}`);

        const backupData = await fs.readFile('backups/backups.json', 'utf8');
        const backups = JSON.parse(backupData);

        backups[backupName] = {
            name: backupName,
            date: new Date().toLocaleString('en-US', {
                timeZone: 'UTC',
            }),
            path: `backups/${backupName}`,
            isBackup: true,
        };
        
        await fs.writeFile('backups/backups.json', JSON.stringify(backups));

        event.sender.send('SAVE_SUCCESS', backups[backupName]);

    } catch (error) {
        event.sender.send('SAVE_ERROR', error);
        console.error('Error reading or parsing file:', error);
    }
}

const handleLoad = async (event: IpcMainEvent, backupName: string) => {
    const destDir = path.join(os.homedir(), 'AppData', 'LocalLow', 'Dodge Roll', 'Enter the Gungeon');
    copyDirectory(`backups/${backupName}`, destDir);
    
    removeRegistryKey();
    
}

const handleDelete = async (event: IpcMainEvent, backupName: string) => {
    try {
        const backupData = await fs.readFile('backups/backups.json', 'utf8');
        const backups = JSON.parse(backupData);
        delete backups[backupName];
        await fs.writeFile('backups/backups.json', JSON.stringify(backups, null, 4));
        await fs.rm(`backups/${backupName}`, { recursive: true });
    } catch (error) {
        console.error('Error in handleDelete:', error);
    }
}

const handleGetAll = async (event: IpcMainEvent) => {
    try {
        const data = await fs.readFile('backups/backups.json', 'utf8');
        const backups = JSON.parse(data);
        event.sender.send('GET_ALL_SUCCESS', Object.values(backups));
    } catch (error) {
        event.sender.send('GET_ALL_ERROR', error);
        console.error('Error reading or parsing file:', error);
    }
}  

const handleGetBackup = async (event: IpcMainEvent, backupName: string) => {
    try {
        const backupData = await fs.readFile('backups/backups.json', 'utf8');
        const backups = JSON.parse(backupData);
        event.sender.send('GET_SUCCESS', backups[backupName]);
    } catch (error) {
        event.sender.send('GET_ERROR', error);
        console.error('Error reading or parsing file:', error);
    }
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
    

    const data = {
        name: backupName,
        date: '',
        path: backupPath,
        isBackup: false,
    };

    try {
        // Check if the folder exists
        await fs.mkdir(folderName, { recursive: true });

        // Create the file if it doesn't exist
        createFile(filePath);

        // Parse the JSON file
        const fileData = JSON.parse(await fs.readFile(filePath, 'utf-8'));
        console.log(fileData);

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
        event: GET_BACKUP,
        callback: handleGetBackup
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

    return () => {
        ipcHandlers.forEach(({ event, callback }) => {
            ipcMain.removeListener(event, callback);
        });
    };
};

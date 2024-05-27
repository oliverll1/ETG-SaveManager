import fs from 'fs/promises';
import path from 'path';
import os from 'os';

import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron';
import { IPCActions } from './IPCActions';
import { copyDirectory, createFile, removeRegistryKey } from './utils';

interface IpcHandler {
    event: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (event: IpcMainEvent, ...args: any ) => void | Promise<void | string>;
}

const { SAVE, LOAD, DELETE, GET_ALL, GET_BACKUP, DELETE_ALL, CLOSE, CREATE, ALWAYS_ON_TOP } = IPCActions.Window;

const handleSave = async (event: IpcMainEvent, arg: string) => {
    const backupName = arg;

    try {
        const sourceDir = path.join(os.homedir(), 'AppData', 'LocalLow', 'Dodge Roll', 'Enter the Gungeon');
        const copied = await copyDirectory(sourceDir, `backups/${backupName}`);

        if(!copied){
            event.sender.send('SAVE_ERROR', 'Failed to copy directory');
            return;
        }

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

const handleLoad = async (event: IpcMainEvent, arg: string) => {
    const backupName = arg;
    try {
        const destDir = path.join(os.homedir(), 'AppData', 'LocalLow', 'Dodge Roll', 'Enter the Gungeon');
        const copied = await copyDirectory(`backups/${backupName}`, destDir);
        removeRegistryKey();

        if(!copied){
            event.sender.send('LOAD_ERROR', 'Failed to copy directory');
            return;
        }

        event.sender.send('LOAD_SUCCESS', 'Failed to copy directory');

    } catch (error) {
        event.sender.send('LOAD_ERROR', 'Failed to copy directory');
        console.error('Error loading backup:', error);
    }
}


const handleDelete = async (_event: IpcMainEvent, arg: string) => {
    const backupName = arg;
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

const handleGetBackup = async (event: IpcMainEvent, arg: string) => {
    const backupName = arg;
    try {
        const backupData = await fs.readFile('backups/backups.json', 'utf8');
        const backups = JSON.parse(backupData);
        event.sender.send('GET_SUCCESS', backups[backupName]);
    } catch (error) {
        event.sender.send('GET_ERROR', error);
        console.error('Error reading or parsing file:', error);
    }
}

const handleDeleteAll = async (_event: IpcMainEvent, arg: string) => {
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

const handleCreate = async (_event: IpcMainEvent, arg: string) => {
    const backupName = arg;
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

const handleSetOnTop = async (event: IpcMainEvent, arg: boolean) => {
    const onTop = arg;
    const window = BrowserWindow.fromWebContents(event.sender);
    if (window) {
        // Use 'screen-saver' level to ensure the window stays on top even over fullscreen apps
        window.setAlwaysOnTop(onTop, 'screen-saver');
    }
};

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
    },
    {
        event: ALWAYS_ON_TOP,
        callback: handleSetOnTop
    }
]


export const registerIPCHandlers = () => {
    ipcHandlers.forEach(( handler: IpcHandler ) => {
        ipcMain.on(handler.event, handler.callback)
    })

    return () => {
        ipcHandlers.forEach(({ event, callback }) => {
            ipcMain.removeListener(event, callback);
        });
    };
};

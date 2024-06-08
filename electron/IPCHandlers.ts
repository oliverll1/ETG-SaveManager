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

const etgSaveDir = path.join(os.homedir(), 'AppData', 'LocalLow', 'Dodge Roll', 'Enter the Gungeon');
const rootBackupDir = path.join(os.homedir(), 'Documents', 'ETGBackups');
const backupsJson = path.join(rootBackupDir, 'backups.json');

const handleSave = async (event: IpcMainEvent, arg: string) => {
    const backupName = arg;

    try {    
        const backupDir = path.join(rootBackupDir, backupName);
        const copied = await copyDirectory(etgSaveDir, backupDir);

        if(!copied){
            event.sender.send('SAVE_ERROR', 'Failed to copy directory');
            return;
        }

        const backupData = await fs.readFile(backupsJson, 'utf8');
        const backups = JSON.parse(backupData);

        backups[backupName] = {
            name: backupName,
            date: new Date().toLocaleString('en-US', {
                timeZone: 'UTC',
            }),
            path: backupDir,
            isBackup: true,
        };
        
        await fs.writeFile(backupsJson, JSON.stringify(backups));

        event.sender.send('SAVE_SUCCESS', backups[backupName]);

    } catch (error) {
        event.sender.send('SAVE_ERROR', error);
        console.error('Error reading or parsing file:', error);
    }
}

const handleLoad = async (event: IpcMainEvent, arg: string) => {
    const backupName = arg;
    const backupDir = path.join(rootBackupDir, backupName);
    try {
        
        const copied = await copyDirectory(backupDir, etgSaveDir);
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
        const backupData = await fs.readFile(backupsJson, 'utf8');
        const backups = JSON.parse(backupData);
        const backupDir = path.join(rootBackupDir, backupName);

        delete backups[backupName];

        await fs.writeFile(backupsJson, JSON.stringify(backups, null, 4));
        await fs.rm(backupDir, { recursive: true });
    } catch (error) {
        console.error('Error in handleDelete:', error);
    }
}

const handleGetAll = async (event: IpcMainEvent) => {
    try {
        const data = await fs.readFile(backupsJson, 'utf8');
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
        const backupData = await fs.readFile(backupsJson, 'utf8');
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

    const backupDir = path.join(rootBackupDir, backupName);
    
    const data = {
        name: backupName,
        date: '',
        path: backupDir,
        isBackup: false,
    };

    try {
        // Check if the folder exists
        await fs.mkdir(backupDir, { recursive: true });

        // Create the file if it doesn't exist
        await createFile(backupsJson);

        // Parse the JSON file
        const fileData = JSON.parse(await fs.readFile(backupsJson, 'utf-8'));
        console.log(fileData);

        // Check if the entry already exists
        if (Object.keys(fileData).includes(backupName)) {
            return 'Entry with that name already exists.';
        }

        // Add the new entry
        fileData[backupName] = data;

        // Write the updated JSON file
        await fs.writeFile(backupsJson, JSON.stringify(fileData, null, 2), 'utf-8');

        await fs.mkdir(backupDir, { recursive: true });
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

import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { getCompletion } from './deepseek';


ipcMain.handle('call-deepseek', async (event: Electron.IpcMainInvokeEvent, args) => {
    return await getCompletion(args);
});


app.whenReady().then(() => {
    const win = new BrowserWindow({
        width: 1200,
        height: 1000,
        webPreferences: {
            webviewTag: true,
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
    });

    win.loadFile('index.html');
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
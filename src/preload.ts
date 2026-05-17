import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    callDeepseek: (args: any) => ipcRenderer.invoke('call-deepseek', args),
});
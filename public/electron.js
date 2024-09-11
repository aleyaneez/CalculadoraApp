const { app, BrowserWindow } = require('electron');
const path = require('path');

// Usar import dinámico para electron-is-dev
let isDev;
(async () => {
    isDev = (await import('electron-is-dev')).default;
})();

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({ width: 900, height: 680 });
    
    // Asegúrate de esperar a que la importación asíncrona se complete
    const checkIsDev = async () => {
        const url = await isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../public/index.html')}`;
        mainWindow.loadURL(url);
        
        if (await isDev) {
            mainWindow.webContents.openDevTools();
        }
    };

    checkIsDev();

    mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

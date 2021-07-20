const {app, BrowserWindow, clipboard, ipcMain, globalShortcut} = require('electron')

let win;

ipcMain.on('cc-write', (event, args) => {
    clipboard.writeText(args)
})

const createWindow = () => {
    win = new BrowserWindow({
        width: 200,
        height: 300,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    })
    win.loadFile('www/index.html')
}

app.whenReady().then(() => {
    createWindow()

    let cache;

    setInterval(() => {
        if (cache !== clipboard.readText()) {
            win.webContents.send('cc-read', clipboard.readText())
        }
        cache = clipboard.readText()
    }, 1000)

    win.on('blur', () => win.hide())

    globalShortcut.register('Alt+V', () => {
        win.show()
    })

})

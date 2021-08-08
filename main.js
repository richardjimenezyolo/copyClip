const {
    app,
    BrowserWindow,
    clipboard,
    ipcMain,
    globalShortcut,
    screen
} = require('electron')

let win;

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
    win.setMenu(null);
}

ipcMain.on('cc-write', (event, args) => {
    clipboard.writeText(args)
})

ipcMain.on('cc-close', () => {
    win.hide()
})


app.whenReady().then(() => {
    createWindow()

    let cache;
    let items = []

    setInterval(() => {
        const clip = clipboard.readText()
        if (cache !== clip) {
            items.push(clip)
        }
        cache = clip
    }, 1000)

    win.on('blur', () => win.hide())

    globalShortcut.register('Alt+V', () => {
        const mousePosition = screen.getCursorScreenPoint()
        win.setPosition(mousePosition.x, mousePosition.y)
        win.show()
        win.webContents.send('cc-read', items)
    })

    ipcMain.on('cc-hide', () => {
        win.hide()
    })

})

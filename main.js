const { app,
    BrowserWindow,
    ipcMain,
    dialog
} = require('electron')

class AppWindow extends BrowserWindow {
    constructor (config = {}, fileHtml = './src/index.html') {
        const defautConfig = {
            width: 1024,
            height: 500,
            webPreferences: {
                nodeIntegration: true
            }
        }
        super({ ...defautConfig, ...config })
        this.loadFile(fileHtml)
        this.once('ready-to-show', () => {
            this.show()
        })
    }
}
  
function createWindow () {   
    // 创建浏览器窗口
    const win = new AppWindow()
    // 打开开发者工具
    win.webContents.openDevTools()
    ipcMain.on('message', (event, arg) => {
        // console.log(event);
        console.log(`收到消息:${arg}`)
        new AppWindow({
            width: 800,
            height: 800,
            // frame: false,
            transparent: true,
            parent: win
        }, 'index.html')
        // event.sender.send('reqly', '我已收到消息')
    })
}

app
    .whenReady()
    .then(createWindow)

ipcMain.on('open-save-img', (event) => {
    dialog.showOpenDialog({
        properties: ['openFile', 'openDirectory', 'multiSelections']
    }, (files) => {
        // console.log(files)
        if (files) {
            event.sender.send('after-save', files)
        }
    })
})
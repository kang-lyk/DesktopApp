const { app, BrowserWindow, ipcMain } = require('electron')

class AppWindow extends BrowserWindow {
    constructor (config = {}, fileHtml = 'index.html') {
        const defautConfig = {
            width: 900,
            height: 900,
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
            width: 200,
            height: 200,
            // frame: false,
            transparent: true,
            parent: win
        }, 'index2.html')
        // event.sender.send('reqly', '我已收到消息')
    })
}

app
    .whenReady()
    .then(createWindow)
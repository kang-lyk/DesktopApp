const { ipcRenderer } = require('electron')
document.querySelector('#j-send').onclick = function () {
    const textVal = document.querySelector('#j-text').value || ''
    ipcRenderer.send('message', textVal)
    new Notification (
        'Title', 
        {
            body: textVal
        }
    )
}


window.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.on('reqly', (event, arg) => {
        alert(arg)
    })
})

// document.querySelector('#j-changeFile').addEventListener('onchange', (event) => {
//     console.log(event)
// })
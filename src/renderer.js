const { ipcRenderer } = require('electron')

// document.querySelector('#j-send').onclick = function () {
//     const textVal = document.querySelector('#j-text').value || ''
//     ipcRenderer.send('message', textVal)
//     new Notification (
//         'Title', 
//         {
//             body: textVal
//         }
//     )
// }

// window.addEventListener('DOMContentLoaded', () => {
//     ipcRenderer.on('reqly', (event, arg) => {
//         alert(arg)
//     })
// })

document.querySelector('#j-changeFile').addEventListener('onchange', (event) => {
    console.log(event)
})

const $rangeText = document.querySelector('#j-rangeText')
document.querySelector('#j-range').addEventListener('change', (event) => {
    $rangeText.innerHTML = `${event.target.value}%`
})

document.querySelector('#j-save').addEventListener('click', () => {
    ipcRenderer.send('open-save-img')
})
ipcRenderer.on('after-save', (event, path) => {
    debugger
    console.log(path);
})

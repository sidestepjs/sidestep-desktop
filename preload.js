const { contextBridge } = require('electron')
const { ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
})

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: { ...ipcRenderer, on: ipcRenderer.on },
})

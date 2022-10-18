export const config = {
  general: {
    allowResizeWindow: true,
    saveSettings: {
      enabled: true,
      key: '',
    },
  },
  windows: [
    {
      name: 'main',
      file: 'app/index.html',
      ipcRendererConf: [],
      forkedProcesses: [],
    },
    {
      name: 'splash',
      file: 'app/splash.html',
      ipcRendererConf: [],
      forkedProcesses: [],
    },
  ],
}

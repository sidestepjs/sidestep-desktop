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
      ipcRendererConf: [],
      scripts: [
        {
          path: 'server/index.js',
          runIn: 'main_process',
        },
        {
          path: 'server/forked.js',
          runIn: 'child_process',
        },
      ],
    },
    {
      name: 'splash',
      ipcRendererConf: [],
    },
  ],
}

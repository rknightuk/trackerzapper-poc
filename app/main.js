const { app, Tray, Menu, clipboard, ipcMain, nativeTheme, BrowserWindow, shell } = require('electron')
const clipboardWatcher = require('electron-clipboard-watcher')
const Zapper = require('./zapper')
const Store = require('./store')

app.dock.hide()

const store = new Store()
const zapper = new Zapper()

let previous = null
let tray = null
let contextMenu = null
const iconType = nativeTheme.shouldUseDarkColors ? 'dark' : 'light'

app.on('window-all-closed', () => {
    // keep app open when closing about page
})

app.whenReady().then(() => {
    const isEnabled = store.get('enabled')
    const toggleData = getToggleData(isEnabled)

    tray = new Tray(toggleData.icon)
    tray.setToolTip('This is my application.')

    contextMenu = Menu.buildFromTemplate([
        { label: toggleData.toggleText, type: 'normal', click: () => toggleEnabled(), checked: isEnabled },
        { label: 'About', type: 'normal', click: () => about() },
        { label: 'Quit', type: 'normal', role: 'quit' },
    ])

    tray.on('click', function (event) {
        toggleEnabled()
    })

    tray.on('right-click', function (event) {
        tray.popUpContextMenu(contextMenu)
    })

    watchClipboard()
})

getToggleData = (enabled) => {
    return {
        toggleText: enabled ? 'Disable Scrubbing' : 'Enable Scrubbing',
        icon: enabled ? `icons/enabled-${iconType}.png` : `icons/disabled-${iconType}.png`,
    }
}

about = () => {
    const win = new BrowserWindow({ width: 300, height: 250 })
    win.loadFile('about.html')
    win.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url)
    })
    win.show()
}

toggleEnabled = () => {
    store.set('enabled', !store.get('enabled'))
    const toggleData = getToggleData(store.get('enabled'))
    contextMenu.items[0].label = toggleData.toggleText
    contextMenu = Menu.buildFromTemplate(contextMenu.items)
    tray.setImage(toggleData.icon)
}

watchClipboard = () => {
    clipboardWatcher({
        watchDelay: 1000,

        onTextChange: function (text) {
            if (!store.get('enabled')) {
                return
            }

            if (text === previous) {
                previous = null
                return
            }

            const formatted = zapper.zap(text)
            if (!formatted) return
            previous = formatted
            clipboard.writeText(formatted)
        }
    })
}

// https://gist.github.com/ccnokes/95cb454860dbf8577e88d734c3f31e08#file-store-js

const { app } = require('electron');
const path = require('path');
const fs = require('fs');

const DEFAULTS = {
    enabled: true,
}

class Store {
    constructor() {
        const userDataPath = (app || remote.app).getPath('userData');
        this.path = path.join(userDataPath, 'prefs.json');
        this.data = parseDataFile(this.path);
    }

    get(key) {
        return this.data[key];
    }

    set(key, val) {
        this.data[key] = val;
        fs.writeFileSync(this.path, JSON.stringify(this.data));
    }
}

function parseDataFile(filePath, defaults) {
    try {
        return JSON.parse(fs.readFileSync(filePath));
    } catch (error) {
        return DEFAULTS;
    }
}

module.exports = Store;
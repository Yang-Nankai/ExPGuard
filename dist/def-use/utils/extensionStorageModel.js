"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtensionStorageModel = void 0;
class ExtensionStorageModel {
    constructor() {
        this.localStore = new Map();
        this.syncStore = new Map();
        this.sessionStore = new Map();
    }
    static getInstance() {
        if (!ExtensionStorageModel.instance) {
            ExtensionStorageModel.instance = new ExtensionStorageModel();
        }
        return ExtensionStorageModel.instance;
    }
    set(area, key, value) {
        this.getStore(area).set(key, value);
    }
    get(area, key) {
        return this.getStore(area).get(key);
    }
    getAll(area) {
        return this.getStore(area);
    }
    getStore(area) {
        switch (area) {
            case "local":
                return this.localStore;
            case "sync":
                return this.syncStore;
            case "session":
                return this.sessionStore;
        }
    }
}
exports.ExtensionStorageModel = ExtensionStorageModel;

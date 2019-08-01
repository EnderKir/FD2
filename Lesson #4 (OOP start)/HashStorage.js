"use strict"
class HashStorage {
    constructor() {
        this.storage = {};
    }
    addValue(key,value) {
        this.storage[key] = value;
    }
    getValue(key) {
        if (key in this.storage) {
            return (key + ' ' + this.storage[key]);
        } else {
            return 'Такого ключа нету';
        }
    }
    deleteValue(key) {
        if (key in this.storage) {
            delete this.storage[key];
            return 'Ключ удалён';
        } else {
            return 'Такого ключа нету';
        }
    }
    getKeys() {
            return Object.keys(this.storage);
    }
    
}

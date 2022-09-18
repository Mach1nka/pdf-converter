import BrowserStorage from './storage';
import { AuthKeys } from './types';

class DOMStorage extends BrowserStorage {
  private storage: Storage;

  constructor(storage: Storage) {
    super();
    this.storage = storage;
  }

  get(key: AuthKeys): any {
    const value = this.storage.getItem(key);
    return value ? JSON.parse(value) : value;
  }

  set(key: AuthKeys, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  delete(key: AuthKeys): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }
}

const localStorageService = new DOMStorage(window.localStorage);
const sessionStorageService = new DOMStorage(window.localStorage);

export { localStorageService, sessionStorageService };

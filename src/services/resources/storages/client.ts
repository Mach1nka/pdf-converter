import { localStorageService } from './dom-storage';
import BrowserStorage from './storage';
import { AuthKeys } from './types';

const manageAuth = (storage: BrowserStorage) => ({
  get: (key: AuthKeys): void => storage.get(key),
  save: (key: AuthKeys, value: any): void => storage.set(key, value),
  delete: (key: AuthKeys): void => storage.delete(key),
});

const clearStorage = (storage: BrowserStorage): void => storage.clear();

const authManagement = manageAuth(localStorageService);

export { authManagement, clearStorage };

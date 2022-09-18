import { AuthKeys } from './types';

abstract class BrowserStorage {
  abstract get(key: AuthKeys): any;

  abstract set(key: AuthKeys, value: any): void;

  abstract delete(key: AuthKeys): void;

  abstract clear(): void;
}

// NOTE: Other storages like IndexDB, localstorage, sessionstorage must extend BrowserStorage.
export default BrowserStorage;

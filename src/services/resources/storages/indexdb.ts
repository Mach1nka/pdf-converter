import BrowserStorage from './storage';
import { AuthKeys } from './types';

class IndexDBStorage extends BrowserStorage {
  private static classInstance?: IndexDBStorage;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.classInstance) {
      return this.classInstance;
    }
    this.classInstance = new IndexDBStorage();
    return this.classInstance;
  }

  public get(key: AuthKeys): any {}

  public set(key: AuthKeys, value: any): void {}

  public delete(key: AuthKeys): void {}

  public clear(): void {}
}

export default IndexDBStorage.getInstance();

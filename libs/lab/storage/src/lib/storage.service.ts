import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private get localStorageAvailable(): Storage | null {
    return typeof window === 'undefined' ? null : window.localStorage;
  }

  public getItem<T = unknown>(key: string): T | null {
    const storage = this.localStorageAvailable;
    if (!storage) return null;

    const value = storage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  }

  public setItem<T = unknown>(key: string, value: T | null): void {
    const storage = this.localStorageAvailable;
    if (!storage) return;

    if (value == null) {
      storage.removeItem(key);
      return;
    }

    storage.setItem(key, JSON.stringify(value));
  }

  public removeItem(key: string): void {
    const storage = this.localStorageAvailable;
    if (!storage) return;

    storage.removeItem(key);
  }
}

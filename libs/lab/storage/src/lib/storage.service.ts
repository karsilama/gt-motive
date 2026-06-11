import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private isBrowser = typeof window !== 'undefined' && !!window.localStorage;

  public getItem<T = unknown>(key: string): T | null {
    if (!this.isBrowser) return null;
    try {
      const v = localStorage.getItem(key);
      return v ? (JSON.parse(v) as T) : null;
    } catch (e) {
      try {
        localStorage.removeItem(key);
      } catch (innerError) {
        console.warn(
          'StorageService.getItem: failed to remove invalid item',
          key,
          innerError,
        );
      }
      console.warn(
        'StorageService.getItem: failed to parse stored value',
        key,
        e,
      );
      return null;
    }
  }

  public setItem<T = unknown>(key: string, value: T | null): void {
    if (!this.isBrowser) return;
    try {
      if (value === null || value === undefined) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (e) {
      console.warn(
        'StorageService.setItem: failed to serialize or store value',
        key,
        e,
      );
    }
  }

  public removeItem(key: string): void {
    if (!this.isBrowser) return;
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn('StorageService.removeItem: failed to remove item', key, e);
    }
  }
}

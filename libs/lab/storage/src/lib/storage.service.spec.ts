import { StorageService } from '../lib/storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    service = new StorageService();
    localStorage.clear();
  });

  it('setItem stores JSON values', () => {
    service.setItem('k', { a: 1 });
    expect(localStorage.getItem('k')).toBe(JSON.stringify({ a: 1 }));
  });

  it('getItem retrieves JSON values', () => {
    localStorage.setItem('k', JSON.stringify({ a: 1 }));
    const v = service.getItem<{ a: number }>('k');
    expect(v).toEqual({ a: 1 });
  });

  it('removeItem removes stored item', () => {
    localStorage.setItem('k', JSON.stringify({ a: 1 }));
    service.removeItem('k');
    expect(localStorage.getItem('k')).toBeNull();
  });
});

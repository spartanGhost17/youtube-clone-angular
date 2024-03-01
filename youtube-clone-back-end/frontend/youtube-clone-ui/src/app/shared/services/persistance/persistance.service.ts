import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersistanceService {

  constructor() { }

  /**
   * set object in local storage 
   * @param key the key
   * @param data the value
  */
  set(key: string, data: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.error("Error saving to local storage", err);
    }
  }

  /**
   * get item from local storage 
   * @param key the key
   * @returns the object
  */
  get(key: string): unknown {
    try {
      const localStorageItem = localStorage.getItem(key);
      return localStorageItem ? JSON.parse(localStorageItem) : null;
    } catch (err) {
      console.error("Error getting from local storage", err);
      return null;
    }
    
  }
  /**
   * remove item from local storage
   * @param key 
  */
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error("Error removing from local storage", err);
    }
  }
}

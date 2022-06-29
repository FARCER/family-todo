import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  public setItem(key: string, data: any): void {
    localStorage.setItem(key, data);
  }

  public getItem(key: string): any {
    return localStorage.getItem(key)
  }
}

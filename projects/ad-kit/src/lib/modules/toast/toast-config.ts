import { InjectionToken } from '@angular/core';

export type ToastType = 'warning' | 'info' | 'success';

export class ToastData {
  type: ToastType;
  text?: string;
}

export interface ToastConfig {
  position: {
    top: number;
    right: number;
  };
}

export const defaultToastConfig: ToastConfig = {
  position: {
    top: 20,
    right: 20,
  },
};


export const TOAST_DATA = new InjectionToken<ToastData>('TOAST_DATA');

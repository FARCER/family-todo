import { InjectionToken, TemplateRef } from '@angular/core';

export class ToastData {
  type: ToastType;
  text?: string;
  template?: TemplateRef<any>;
  templateContext?: {};
}

export interface ToastConfig {
  position?: {
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

export type ToastType = 'warning' | 'info' | 'success';

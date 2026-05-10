export const TOAST_TYPE = {
  Success: 'success',
  Error: 'error'
} as const;

export type ToastType = typeof TOAST_TYPE[keyof typeof TOAST_TYPE];

export interface Toast {
  message: string;
  type: ToastType;
}
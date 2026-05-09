import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  message: string;
  type: 'success' | 'error';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  show(message: string, type: 'success' | 'error') {
    const current = this.toastsSubject.value;

    const newToast: Toast = { message, type };

    this.toastsSubject.next([...current, newToast]);

    setTimeout(() => {
      this.remove(newToast);
    }, 3000);
  }

  remove(toast: Toast) {
    this.toastsSubject.next(
      this.toastsSubject.value.filter(t => t !== toast)
    );
  }
}
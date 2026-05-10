import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast, ToastType } from '../interfaces/toast';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  show(message: string, type: ToastType) {

    const exists = this.toastsSubject.value.some(
      toast => toast.message === message && toast.type === type
    );

    if (exists) {
      return;
    }

    const newToast: Toast = { message, type };
    this.addToast(newToast);

    setTimeout(() => {
      this.remove(newToast);
    }, 5000);
  }

  private addToast(toast: Toast) {
    this.toastsSubject.next([...this.toastsSubject.value, toast]);
  }

  remove(toast: Toast) {
    this.toastsSubject.next(
      this.toastsSubject.value.filter(item => item !== toast)
    );
  }
}
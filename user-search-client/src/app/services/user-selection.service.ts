import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserSelectionService {
  private storageKey = 'selectedUsers';

  getSelectedUsers(): any[] {
    return JSON.parse(sessionStorage.getItem(this.storageKey) || '[]');
  }

  setSelectedUsers(users: any[]) {
    sessionStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  clear() {
    sessionStorage.removeItem(this.storageKey);
  }
}
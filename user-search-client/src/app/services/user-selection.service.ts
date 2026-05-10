import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({ providedIn: 'root' })
/** 
 * Simple persistance implementation using session storage
 * Allow us to keep selected users (refresh, reload etc.)
*/
export class UserSelectionService {
  private storageKey = 'selectedUsers';

  getSelectedUsers(): User[] {
    return JSON.parse(sessionStorage.getItem(this.storageKey) || '[]');
  }

  setSelectedUsers(users: User[]) {
    sessionStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  clear() {
    sessionStorage.removeItem(this.storageKey);
  }
}
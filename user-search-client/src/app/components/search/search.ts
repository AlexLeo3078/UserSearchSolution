import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class SearchComponent {

  // =====================
  // STATE
  // =====================
  users: any[] = [];              // suggestions dropdown
  selectedUser: any = null;      // currently selected user
  selectedUsers: any[] = [];     // final selected list
  searchTerm: string = '';       // input value

  constructor(private userService: UserService) {}

  // =====================
  // SEARCH (typing)
  // =====================
  onSearch(event: any) {
    const value = event.target.value;
    this.searchTerm = value;

    const term = value.toLowerCase();

    if (value.length < 2) {
      this.users = [];
      return;
    }

    this.userService.searchUsers(value)
      .subscribe(data => {
                this.users = data;
      });
  }

  // =====================
  // SELECT FROM SUGGESTIONS
  // =====================
  selectUser(user: any) {
    this.selectedUser = user;

    // fill input with selected name
    this.searchTerm = `${user.firstName} ${user.lastName}`;

    // hide dropdown
    this.users = [];
  }

  // =====================
  // GO BUTTON CLICK
  // =====================
  onSearchClick() {
    if (!this.selectedUser) return;

    // prevent duplicates
    const exists = this.selectedUsers.some(
      u => u.email === this.selectedUser.email
    );

    if (!exists) {
      this.selectedUsers.push(this.selectedUser);
    }

    // reset selection state
    this.selectedUser = null;
    this.searchTerm = '';
    this.users = [];
  }

  // =====================
  // HIGHLIGHT MATCHING TEXT
  // =====================
  getHighlightMatchingParts(text: string) {
    const normalizedSearchTerm = (this.searchTerm || '').trim().toLowerCase();

    if (!normalizedSearchTerm){ 
      return [{ 
        text, 
        match: false 
      }];
    }

    // find index of search term in text (case-insensitive)
    const index = text.toLowerCase().indexOf(normalizedSearchTerm);

    // if no match, return whole text as non-matching
    if (index === -1){ 
      return [{ 
        text, 
        match: false 
      }];
    }

    // split text into three parts: before match, match, after match
    const beforeMatch = text.slice(0, index);
    const match = text.slice(index, index + normalizedSearchTerm.length);
    const afterMatch = text.slice(index + normalizedSearchTerm.length);

    return [
      { text: beforeMatch, match: false },
      { text: match, match: true },
      { text: afterMatch, match: false }
    ];
  }
}
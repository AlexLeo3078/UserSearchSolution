import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, Subject, switchMap } from 'rxjs';
import { UserSelectionService } from '../../services/user-selection.service';
import { User, UserSelection } from '../../interfaces/user';
import { ToastService } from '../../services/toast.service';
import { TOAST_TYPE } from '../../interfaces/toast';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class SearchComponent implements OnInit {
  private searchSubject = new Subject<string>();

  public usersSubject = new BehaviorSubject<UserSelection[]>([]);
  public currentSelectedUser: UserSelection | null = null;
  public listOfSelectedUsers: User[] = [];
  public searchTerm: string = '';

  constructor(
    private userService: UserService,
    private userSelectionService: UserSelectionService,
    private toast: ToastService,) { }

  /**
   * Initializes the component by setting up a subscription to the searchSubject. 
   * It applies several RxJS operators to handle debouncing, filtering, and switching to the latest search term.
   * When new data is received from the userService, it updates the usersSubject BehaviorSubject, which in turn updates the suggestions dropdown.
   */
  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(500),
      filter(query => query.length >= 2),
      switchMap(value => this.userService.getSuggestions(value))
    ).subscribe(data => {
      this.usersSubject.next(data);
    });

    // Populate from storage
    this.listOfSelectedUsers = [...this.userSelectionService.getSelectedUsers()];
  }


  /**
   * Handles the input event from the search field. If the input value is less than 2 characters, it clears the suggestions.
   * Otherwise, it updates the search term and emits it to the searchSubject, which triggers the search logic in ngOnInit.
   */
  onSearch(value: string) {
    if (value.length < 2) {
      this.usersSubject.next([]);
      return;
    }

    this.searchTerm = value;
    this.searchSubject.next(value);
  }


  /**
   * Handles the selection of a user from the suggestions dropdown. 
   * It sets the selectedUser state, updates the search input to show the selected user's name, and clears the suggestions.
   */
  selectUser(user: UserSelection) {
    this.currentSelectedUser = user;

    // fill input with selected name
    this.searchTerm = `${user.firstName} ${user.lastName}`;

    // hide dropdown
    this.usersSubject.next([]);
  }

  /**
   * Adds the currently selected user to the list of selected users, if it's not already there.
   * Then resets the selection state and clears the search input and suggestions.
   */
  onSearchClick() {
    if (!this.currentSelectedUser) return;

    // Prevent unnecessary call to DB and duplicates on FE
    const exists = this.listOfSelectedUsers.some(
      user => user.id === this.currentSelectedUser?.id
    )

    if (exists) {
      this.toast.show('User already displayed!', TOAST_TYPE.Info)
      this.cleanUpState();
      return;
    }

    this.userService.getUserById(this.currentSelectedUser.id)
      .subscribe(result => {
        this.listOfSelectedUsers.push(result);
        this.userSelectionService.setSelectedUsers(this.listOfSelectedUsers);

        this.cleanUpState();
      });
  }


  /**
   * Splits the given text into parts that match the current search term and parts that don't.
   * This is used to highlight the matching portion of the user name in the suggestions dropdown.
   * Returns an array of objects with 'text' and 'match' properties, where 'match' is true for the part that matches the search term.
   */
  getHighlightMatchingParts(text: string) {
    const normalizedSearchTerm = (this.searchTerm || '').trim().toLowerCase();

    if (!normalizedSearchTerm) {
      return [{
        text,
        match: false
      }];
    }

    // find index of search term in text (case-insensitive)
    const index = text.toLowerCase().indexOf(normalizedSearchTerm);

    // if no match, return whole text as non-matching
    if (index === -1) {
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


  /**
   * Clean up state
   */
  private cleanUpState() {
    this.currentSelectedUser = null;
    this.searchTerm = '';
    this.usersSubject.next([]);
  }
}
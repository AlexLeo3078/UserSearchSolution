import { Component, signal } from '@angular/core';
import { SearchComponent } from './components/search/search';
import { AddUserComponent } from './components/add-user/add-user';
import {ToastComponent} from './components/toast/toast'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SearchComponent, AddUserComponent, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  protected readonly title = signal('user-search-client');
}

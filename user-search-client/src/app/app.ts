import { Component, signal } from '@angular/core';
import { SearchComponent } from './components/search/search';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SearchComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  protected readonly title = signal('user-search-client');
}

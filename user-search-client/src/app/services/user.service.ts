import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { User, UserSelection } from '../interfaces/user';

@Injectable({ providedIn: 'root' })
export class UserService {

  private mockData = [
    { id: 1, firstName: 'Alex', lastName: 'Smith', jobTitle: 'QA Lead', email: 'asmith@test.com', phone: '07723 743289' },
    { id: 2, firstName: 'Alexis', lastName: 'Crawley', jobTitle: 'DevOps Engineer', email: 'acrawley@test.com', phone: '07778 667412' },
    { id: 3, firstName: 'David', lastName: 'Jones', jobTitle: 'Developer', email: 'djones@test.com', phone: '07789 543768' },
    { id: 4, firstName: 'David', lastName: 'Gold', jobTitle: 'DevOps Engineer', email: 'dgold@test.com', phone: '07768 479563' },
    { id: 5, firstName: 'Gavin', lastName: 'Miles', jobTitle: 'UX Designer', email: 'gmiles@test.com', phone: '07881 987554' },
    { id: 6, firstName: 'Hayley', lastName: 'Walker-Smith', jobTitle: 'Developer', email: 'hwalker@test.com', phone: '07888 932145' },
    { id: 7, firstName: 'Kathy', lastName: 'Smith', jobTitle: 'UX Lead', email: 'ksmith@test.com', phone: '07765 332287' },
    { id: 8, firstName: 'Kieran', lastName: 'James', jobTitle: 'Developer', email: 'kjames@test.com', phone: '07898 654123' },
    { id: 9, firstName: 'Lisa', lastName: 'Holmes', jobTitle: 'Development Lead', email: 'lholmes@test.com', phone: '07756 896512' },
    { id: 10, firstName: 'Phil', lastName: 'Walker', jobTitle: 'Senior QA', email: 'pwalker@test.com', phone: '07889 984447' },
    { id: 11, firstName: 'Phillipa', lastName: 'Walker', jobTitle: 'QA Lead', email: 'pwalker2@test.com', phone: '07775 357951' },
    { id: 12, firstName: 'Rebecca', lastName: 'Bates', jobTitle: 'Product Development Manager', email: 'rbates@test.com', phone: '07798 548733' }
  ];

  private baseUrl = 'http://localhost:5093/api/users';

  constructor(private http: HttpClient) { }

  /**
   * Get user suggestions based on the provided search term. 
   * If the application is configured to use a mock API, it filters the mock data locally.
   * Otherwise, it makes an HTTP GET request to the backend API to retrieve matching users.
   */
  getSuggestions(term: string): Observable<UserSelection[]> {
    if (environment.useMockApi) {
      const lower = term.toLowerCase();

      const result = this.mockData.filter(user =>
        user.firstName.toLowerCase().includes(lower) ||
        user.lastName.toLowerCase().includes(lower)
      )
        .map(user => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName
        }));

      return of(result);
    }

    return this.http.get<UserSelection[]>(
      `${this.baseUrl}/get-suggestions?searchTerm=${term}`
    );
  }

  /**
   * Get User by id
   * If the application is configured to use a mock API, it filters the mock data locally.
   * Otherwise, it makes an HTTP GET request to the backend API to retrieve user.
   */
  getUserById(id: number): Observable<User> {
    if (environment.useMockApi) {
      const user = this.mockData.find(u => u.id == id);

      if (!user) {
        return of(null as any);
      }

      const result = {
        firstName: user.firstName,
        lastName: user.lastName,
        jobTitle: user.jobTitle,
        email: user.email,
        phone: user.phone
      };

      return of(result);
    }
    return this.http.get<User>(
      `${this.baseUrl}/${id}`
    )
  }

  /**
   * Add a new User
   * If the application is configured to use a mock API, it filters the mock data locally.
   * Otherwise, it makes an HTTP POST request to the backend API to add a new user.
   */
  addUser(user: User): Observable<User> {
    if (environment.useMockApi) {
      const id = this.mockData.length + 1;
      this.mockData.push({
        id,
        firstName: user.firstName,
        lastName: user.lastName,
        jobTitle: user.jobTitle || '',
        email: user.email,
        phone: user.phone
      });
      return of(user);
    }

    return this.http.post<User>(
      `${this.baseUrl}`,
      user
    );
  }
}
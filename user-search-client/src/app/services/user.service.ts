import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {

private mockData = [
  { firstName: 'David', lastName: 'Jones', jobTitle: 'Developer', email: 'djones@test.com', phone: '07789 543768' },
  { firstName: 'Lisa', lastName: 'Holmes', jobTitle: 'Development Lead', email: 'lholmes@test.com', phone: '07756 896512' },
  { firstName: 'Alex', lastName: 'Smith', jobTitle: 'QA Lead', email: 'asmith@test.com', phone: '07723 743289' },
  { firstName: 'Kieran', lastName: 'James', jobTitle: 'Developer', email: 'kjames@test.com', phone: '07898 654123' },
  { firstName: 'Gavin', lastName: 'Miles', jobTitle: 'UX Designer', email: 'gmiles@test.com', phone: '07881 987554' },
  { firstName: 'Kathy', lastName: 'Smith', jobTitle: 'UX Lead', email: 'ksmith@test.com', phone: '07765 332287' },
  { firstName: 'Phil', lastName: 'Walker', jobTitle: 'Senior QA', email: 'pwalker@test.com', phone: '07889 984447' },
  { firstName: 'Rebecca', lastName: 'Bates', jobTitle: 'Product Development Manager', email: 'rbates@test.com', phone: '07798 548733' },
  { firstName: 'Hayley', lastName: 'Walker-Smith', jobTitle: 'Developer', email: 'hwalker@test.com', phone: '07888 932145' },
  { firstName: 'Alexis', lastName: 'Crawley', jobTitle: 'DevOps Engineer', email: 'acrawley@test.com', phone: '07778 667412' },
  { firstName: 'David', lastName: 'Gold', jobTitle: 'DevOps Engineer', email: 'dgold@test.com', phone: '07768 479563' },
  { firstName: 'Phillipa', lastName: 'Walker', jobTitle: 'QA Lead', email: 'pwalker2@test.com', phone: '07775 357951' }
];

  private baseUrl = 'http://localhost:5093/api/users';

  constructor(private http: HttpClient) {}

  /**
   * Searches for users based on the provided search term. If the application is configured to use a mock API, it filters the mock data locally.
   * Otherwise, it makes an HTTP GET request to the backend API to retrieve matching users.
   */
  searchUsers(term: string): Observable<any[]> {

    if (environment.useMockApi) {
      const lower = term.toLowerCase();

      const result = this.mockData.filter(u =>
        u.firstName.toLowerCase().includes(lower) ||
        u.lastName.toLowerCase().includes(lower)
      );

      return of(result);
    }

    return this.http.get<any[]>(
      `${this.baseUrl}/search?searchTerm=${term}`
    );
  }
}
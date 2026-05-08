import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {

  private mockData = [
    { firstName: 'Alex', lastName: 'Leo', jobTitle: 'Software Engineer', email: 'alex@test.com', phone: '123' },
    { firstName: 'Alex', lastName: 'Johnson', jobTitle: 'Product Manager', email: 'alexJ@test.com', phone: '123' },
    { firstName: 'John', lastName: 'Smith', jobTitle: 'Designer', email: 'john@test.com', phone: '456' },
    { firstName: 'Jane', lastName: 'Doe', jobTitle: 'Sales Associate', email: 'jane@test.com', phone: '789' }
  ];

  constructor(private http: HttpClient) {}

  searchUsers(term: string): Observable<any[]> {

    // =========================
    // MOCK MODE
    // =========================
    if (environment.useMockApi) {
      const lower = term.toLowerCase();

      const result = this.mockData.filter(u =>
        u.firstName.toLowerCase().includes(lower) ||
        u.lastName.toLowerCase().includes(lower)
      );

      return of(result);
    }

    // =========================
    // REAL API MODE
    // =========================
    return this.http.get<any[]>(
      `/api/users/search?term=${term}`
    );
  }
}
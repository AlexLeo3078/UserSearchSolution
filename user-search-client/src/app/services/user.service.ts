import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { User, UserSelection } from '../interfaces/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  
  private baseUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  /**
   * Get user suggestions based on the provided search term. 
   */
  getSuggestions(term: string): Observable<UserSelection[]> {
    return this.http.get<UserSelection[]>(
      `${this.baseUrl}/get-suggestions?searchTerm=${term}`
    );
  }

  /**
   * Get User by id
   */
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(
      `${this.baseUrl}/${id}`
    )
  }

  /**
   * Add a new User
   */
  addUser(user: User): Observable<User> {
    return this.http.post<User>(
      `${this.baseUrl}`,
      user
    );
  }
}
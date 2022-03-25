import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { User } from '../interface/user';
import { CustomResponseUser } from '../interface/custom-response-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = 'https://students-java-server.herokuapp.com';

  constructor(private http: HttpClient) {
  }

  users$ = <Observable<CustomResponseUser>>
    this.http.get<CustomResponseUser>(`${this.apiUrl}/server/user`).pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  findUserByEmail$ = (email: string, password: string) => <Observable<CustomResponseUser>>
    this.http.get(`${this.apiUrl}/server/user?email=${email}&password=${password}`).pipe(map(data => data))

  save$ = (user: User) => <Observable<CustomResponseUser>>
    this.http.post(`${this.apiUrl}/server/user`, user).pipe(map(data => data))

  delete$ = (userId: number) => <Observable<CustomResponseUser>>
    this.http.delete<CustomResponseUser>(`${this.apiUrl}/server/deleteStudent/${userId}`).pipe(
      tap(console.log),
      catchError(this.handleError)
    )

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError (`An error occurred - Error code: ${error.status}`);
  }
}

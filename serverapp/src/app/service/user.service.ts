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
  private readonly apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  users$ = <Observable<CustomResponseUser>>
    this.http.get<CustomResponseUser>(`${this.apiUrl}/server/user`).pipe(
    tap(console.log),
    catchError(this.handleError)
  );

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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, filter, take } from 'rxjs/operators';
import {User} from '../../User'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = 'https://randomuser.me/api/?inc=email,name&results=50'
  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getUser(email: string): Observable<User[]> {
    of([{num1: 1, num2: 2, num3: 3}, {num1: 4, num2: 8, num3: 12}]).pipe(
      map(obj => obj.filter(obj => obj.num1 >= 1))
    ).subscribe(obj => console.log(obj))

    
      return this.http.get<{results: User[]}>(this.apiUrl).pipe(map(results => results.results))
    // return this.http.get<any>(this.apiUrl).pipe(map((res) => {
    //   return res.results.filter((users: User) => users.email.startsWith(email));
    // }))
  }
  autoComplete(emailQuery: string): Observable<string[]> {
    return this.http.get(this.apiUrl).pipe(
      map((response: any) => response.results.map((results: User) => results.email)
      .filter((results: string) => results.startsWith(emailQuery))),
    )
  }
}

import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { User } from '../interfaces/user'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'https://peticiones.online/api/users'

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl)
  }

  getUser(id:string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`)
  }

  createUser(user:User): Observable<any> {
    return this.http.post(this.apiUrl,user)
  }

  updateUser(id:string,user:User): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`,user)
  }

  deleteUser(id:string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
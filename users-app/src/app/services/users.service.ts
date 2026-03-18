import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { User } from '../interfaces/user'

export interface UsersApiResponse {
  page: number
  per_page: number
  total: number
  total_pages: number
  results: User[]
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'https://peticiones.online/api/users'

  constructor(private http: HttpClient) {}

  getUsers(page = 1): Observable<UsersApiResponse> {
    const params = new HttpParams().set('page', page.toString())
    return this.http.get<UsersApiResponse>(this.apiUrl, { params })
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
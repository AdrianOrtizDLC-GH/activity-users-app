import { Component, OnInit } from '@angular/core'
import { UsersService } from '../../services/users.service'
import { User } from '../../interfaces/user'
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html'
})
export class HomeComponent implements OnInit {

  users:User[]=[]
  loading = true
  apiError = ''

  constructor(private usersService:UsersService){}

  private getUserKey(user: User) {
    return user._id || user.id || ''
  }

  private normalizeUser(user: any): User {
    const normalized: User = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      image: user.image,
      _id: user._id || user.id,
      id: user.id || user._id,
      username: user.username || (user.email ? user.email.split('@')[0] : undefined),
      password: user.password
    }
    return normalized
  }

  ngOnInit(){
    const state = history.state as { newUser?: User, updatedUser?: User } | undefined
    this.loading = true
    this.apiError = ''

    this.usersService.getUsers(1).subscribe({
      next: res => {
        const rawUsers: any[] = Array.isArray(res?.results) ? res.results : []
        this.users = rawUsers.map(u => this.normalizeUser(u))

        if(state?.newUser){
          const newUser = this.normalizeUser(state.newUser as any)
          if(!this.users.some(u => this.getUserKey(u) === this.getUserKey(newUser))){
            this.users.unshift(newUser)
          }
        }

        if(state?.updatedUser){
          const updatedUser = this.normalizeUser(state.updatedUser as any)
          this.users = this.users.map(u => this.getUserKey(u) === this.getUserKey(updatedUser) ? updatedUser : u)
          if(!this.users.some(u => this.getUserKey(u) === this.getUserKey(updatedUser))){
            this.users.unshift(updatedUser)
          }
        }

        this.loading = false
        console.log('Home users final', this.users)
      },
      error: err => {
        this.loading = false
        this.apiError = 'Error cargando usuarios: ' + (err.message || err)
        console.error('Error en getUsers', err)
      }
    })
  }

  // Eliminar loadAllUsers, simplificamos a paginación de 1 página para evitar hangs


  deleteUser(id:string){
    if(confirm("¿Eliminar usuario?")){
      this.usersService.deleteUser(id).subscribe(()=>{
        this.users = this.users.filter(u => this.getUserKey(u) !== id)
      })
    }
  }
}
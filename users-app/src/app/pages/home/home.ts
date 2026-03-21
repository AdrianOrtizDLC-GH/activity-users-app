import { Component, OnInit, signal } from '@angular/core'
import { UsersService } from '../../services/users.service'
import { User } from '../../interfaces/user'
import { CommonModule } from '@angular/common'
import { UserCard } from '../../components/user-card/user-card'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, UserCard],
  templateUrl: './home.html'
})
export class HomeComponent implements OnInit {

  users = signal<User[]>([])
  loading = signal(true)
  apiError = signal('')

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
    this.loading.set(true)
    this.apiError.set('')

    this.usersService.getUsers(1).subscribe({
      next: res => {
        const rawUsers: any[] = Array.isArray(res?.results) ? res.results : []
        const normalizedUsers = rawUsers.map(u => this.normalizeUser(u))

        let currentUsers = normalizedUsers

        if(state?.newUser){
          const newUser = this.normalizeUser(state.newUser as any)
          if(!currentUsers.some(u => this.getUserKey(u) === this.getUserKey(newUser))){
            currentUsers.unshift(newUser)
          }
        }

        if(state?.updatedUser){
          const updatedUser = this.normalizeUser(state.updatedUser as any)
          currentUsers = currentUsers.map(u => this.getUserKey(u) === this.getUserKey(updatedUser) ? updatedUser : u)
          if(!currentUsers.some(u => this.getUserKey(u) === this.getUserKey(updatedUser))){
            currentUsers.unshift(updatedUser)
          }
        }

        this.users.set(currentUsers)
        this.loading.set(false)
        console.log('Home users final', this.users())
      },
      error: err => {
        this.loading.set(false)
        this.apiError.set('Error cargando usuarios: ' + (err.message || err))
        console.error('Error en getUsers', err)
      }
    })
  }

  // Eliminar loadAllUsers, simplificamos a paginación de 1 página para evitar hangs


  deleteUser(id?: string){
    if(!id){
      console.warn('deleteUser called with undefined id')
      return
    }

    if(confirm("¿Eliminar usuario?")){
      this.usersService.deleteUser(id).subscribe(()=>{
        this.users.set(this.users().filter(u => this.getUserKey(u) !== id))
      })
    }
  }
}
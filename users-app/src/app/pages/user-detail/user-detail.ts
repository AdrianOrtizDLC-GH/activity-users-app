import { Component, OnInit, signal } from '@angular/core'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { UsersService } from '../../services/users.service'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-detail.html'
})
export class UserDetailComponent implements OnInit {

  user = signal<any>(null)
  loading = signal(true)
  error = signal('')

  constructor(
    private route:ActivatedRoute,
    private usersService:UsersService,
    private router:Router
  ){}

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id')!
    this.loading.set(true)
    this.error.set('')

    this.usersService.getUser(id)
      .subscribe({
        next: res => {
          this.user.set({ ...res, _id: res._id || res.id })
          this.loading.set(false)
        },
        error: err => {
          this.loading.set(false)
          this.error.set('Error cargando usuario: ' + (err.message || err))
          console.error('Error en getUser', err)
        }
      })
  }

  deleteUser(){
    const user = this.user()
    if(!user){
      return
    }

    if(confirm("¿Eliminar usuario?")){
      this.usersService.deleteUser(user._id)
        .subscribe(()=>{
          this.router.navigate(['/home'])
        })
    }
  }
}
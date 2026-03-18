import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { UsersService } from '../../services/users.service'
import { CommonModule } from '@angular/common'
import { User } from '../../interfaces/user'

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-form.html'
})
export class UserFormComponent implements OnInit {

  user:User = {
    first_name:'',
    last_name:'',
    email:'',
    image:''
  }

  isEdit = false
  error = ''

  constructor(
    private usersService:UsersService,
    private route:ActivatedRoute,
    private router:Router
  ){}

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id')

    if(id){
      this.isEdit = true
      this.usersService.getUser(id)
        .subscribe(res=>{
          this.user = res
        })
    }
  }

  normalizeServerUser(user: any): User {
    const normalized = { ...user } as User
    if(!normalized._id && normalized.id){
      normalized._id = normalized.id
    }
    if(!normalized.username && normalized.email){
      normalized.username = normalized.email.split('@')[0]
    }
    return normalized
  }

  save(){

    if(!this.user.first_name || !this.user.last_name || !this.user.email){
      this.error = "Todos los campos son obligatorios"
      return
    }

    if(!this.user.email.includes("@")){
      this.error = "Email inválido"
      return
    }

    if(this.isEdit){
      this.usersService.updateUser(this.user._id!, this.user)
        .subscribe({
          next: updated => {
            const normalizedUpdated = this.normalizeServerUser(updated)
            this.router.navigate(['/home'], { state: { updatedUser: normalizedUpdated } })
          },
          error: ()=> this.error = 'No se pudo actualizar el usuario'
        })
    }else{
      this.usersService.createUser(this.user)
        .subscribe({
          next: created => {
            const normalizedCreated = this.normalizeServerUser(created)
            this.router.navigate(['/home'], { state: { newUser: normalizedCreated } })
          },
          error: ()=> this.error = 'No se pudo crear el usuario'
        })
    }

  }
}
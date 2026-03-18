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

  constructor(private usersService:UsersService){}

  ngOnInit(){
    this.usersService.getUsers()
      .subscribe(res=>{
        this.users = res.results
      })
  }

  deleteUser(id:string){
    if(confirm("¿Eliminar usuario?")){
      this.usersService.deleteUser(id).subscribe(()=>{
        this.users = this.users.filter(u => u._id !== id)
      })
    }
  }
}
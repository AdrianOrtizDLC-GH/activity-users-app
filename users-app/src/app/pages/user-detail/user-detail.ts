import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { UsersService } from '../../services/users.service'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {

  user:any

  constructor(
    private route:ActivatedRoute,
    private usersService:UsersService,
    private router:Router
  ){}

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id')!
    this.usersService.getUser(id)
      .subscribe(res=>{
        this.user = res
      })
  }

  deleteUser(){
    if(confirm("¿Eliminar usuario?")){
      this.usersService.deleteUser(this.user._id)
        .subscribe(()=>{
          this.router.navigate(['/home'])
        })
    }
  }
}
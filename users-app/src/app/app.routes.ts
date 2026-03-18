import { Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home'
import { UserDetailComponent } from './pages/user-detail/user-detail'
import { UserFormComponent } from './pages/user-form/user-form'

export const routes: Routes = [

  { path:'', redirectTo:'home', pathMatch:'full' },

  { path:'home', component:HomeComponent },

  { path:'user/:id', component:UserDetailComponent },

  { path:'newuser', component:UserFormComponent },

  { path:'updateuser/:id', component:UserFormComponent }

]
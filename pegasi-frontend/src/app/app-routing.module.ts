import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { InicioViewComponent } from './views/inicio-view/inicio-view.component'
import { AgendamientosViewComponent } from './views/agendamientos-view/agendamientos-view.component'

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioViewComponent },
  { path: 'agendamientos', component: AgendamientosViewComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

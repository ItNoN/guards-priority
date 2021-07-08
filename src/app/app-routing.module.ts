import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './components/blank/blank.component';
import { ResultGuard } from './guards/result.guard';

const routes: Routes = [
  {
    path: 'blank',
    component: BlankComponent,
    canActivate: [ResultGuard],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

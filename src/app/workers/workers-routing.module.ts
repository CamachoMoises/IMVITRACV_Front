import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkersTableComponent } from './workers-table/workers-table.component'

const routes: Routes = [{ path: '', component: WorkersTableComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkersRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlazosComponent } from './plazos.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: PlazosComponent }
    ])],
    exports: [RouterModule]
})
export class PlazosRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CotizacionesComponent } from './cotizaciones.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CotizacionesComponent }
    ])],
    exports: [RouterModule]
})
export class CotizacionesRoutingModule { }

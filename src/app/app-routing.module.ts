import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'Cotizaciones', loadChildren: () => import('./demo/components/cotizaciones/cotizaciones.module').then(m => m.CotizacionesModule) },
                    { path: 'Plazos', loadChildren: () => import('./demo/components/plazos/plazos.module').then(m => m.PlazosModule) },
                    { path: 'Productos', loadChildren: () => import('./demo/components/productos/productos.module').then(m => m.ProductosModule) },
                ]
            },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

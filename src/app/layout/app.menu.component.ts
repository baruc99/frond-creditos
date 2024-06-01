import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Productos',
                items: [
                    { label: 'Productos', icon: 'pi pi-fw pi-home', routerLink: ['/Productos'] }
                ]
            },
            {
                label: 'Plazos',
                items: [
                    { label: 'Plazos', icon: 'pi pi-fw pi-home', routerLink: ['/Plazos'] }
                ]
            },
            {
                label: 'Cotizaciones',
                items: [
                    { label: 'Cotizaciones', icon: 'pi pi-fw pi-home', routerLink: ['/Cotizaciones'] }
                ]
            },
        ];
    }
}

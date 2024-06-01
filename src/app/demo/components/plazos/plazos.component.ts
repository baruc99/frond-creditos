import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { Plazo } from '../../api/plazo';
import { MessageService } from 'primeng/api';
import { PlazosService } from '../../../demo/service/plazos.service'


@Component({
    selector: 'app-plazos',
    templateUrl: './plazos.component.html',
    styleUrl: './plazos.component.scss',
    providers: [MessageService]
})
export class PlazosComponent {

    // productDialog: boolean = false;
    plazoDialog: boolean = false;

    // deleteProductDialog: boolean = false;
    deletePlazoDialog: boolean = false;

    // deleteProductsDialog: boolean = false;
    deletePlazosDialog: boolean = false;

    // products: Producto[] = [];
    plazos: Plazo[] = [];

    plazo: Plazo = {};

    selectedPlazo: Plazo[] = [];

    submitted: boolean = false;



    constructor(
        private messageService: MessageService,
        private plazosSercices: PlazosService
    ) { }

    ngOnInit() {
        this.plazosSercices.getAllTerms().subscribe(data => {
            this.plazos = data;
        });


    }

    openNew() {
        this.plazo = {};
        this.submitted = false;
        this.plazoDialog = true;
    }

    deleteSelectedProducts() {
        this.deletePlazosDialog = true;
    }

    editProduct(plazo: Plazo) {
        this.plazo = { ...plazo };
        this.plazoDialog = true;
    }

    deleteProduct(plazo: Plazo) {
        this.deletePlazoDialog = true;
        this.plazo = { ...plazo };
    }

    confirmDeleteSelected() {
        this.deletePlazosDialog = false;
        console.log(this.selectedPlazo);

        const deleteRequests = this.selectedPlazo.map(plazo => this.plazosSercices.deleteTerm(plazo.id_plazo));
        Promise.all(deleteRequests).then(() => {
            this.plazos = this.plazos.filter(plazo => !this.selectedPlazo.includes(plazo));
            this.selectedPlazo = [];
        }).catch(error => {
            console.error(error);
        });
    }

    confirmDelete() {
        this.deletePlazoDialog = false;

        this.plazosSercices.deleteTerm(this.plazo.id_plazo).subscribe(() => {
            this.plazos = this.plazos.filter(val => val.id_plazo !== this.plazo.id_plazo);
            this.plazo = {};
        }, error => {
            console.error(error);
        });
    }

    hideDialog() {
        this.plazoDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        // console.log(this.product);
        this.plazosSercices.saveOrUpdateTerm(this.plazo).subscribe(data => {
            // Aquí asumimos que data es un solo producto
            const index = this.plazos.findIndex(p => p.id_plazo === data.id_plazo);
            if (index !== -1) {
                // Actualizar el producto existente
                this.plazos[index] = data;
            } else {
                // Agregar un nuevo producto a la lista
                this.plazos.push(data);
            }
            // console.log(data);
            this.plazoDialog = false;

            this.plazo = {};
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }


    onWeeksChange() {
        // this.calcularTasas();
    }

    // calcularTasas() {
    //     const semanas = this.plazo.semanas;

    //     if (semanas != null) {
    //         this.plazo.tasa_normal = this.redondearNumero(1.0366 * semanas, 4);
    //         this.plazo.tasa_puntual = this.redondearNumero(0.8963 * semanas, 4);
    //     } else {
    //         this.plazo.tasa_normal = null;
    //         this.plazo.tasa_puntual = null;
    //     }
    // }

    // redondearNumero(num: number, decimales: number): number {
    //     const factor = Math.pow(10, decimales);
    //     return Math.round(num * factor) / factor;
    // }
}

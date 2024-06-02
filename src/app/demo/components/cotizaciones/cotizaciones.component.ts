import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Cotizacion } from '../../api/cotizaciones';
import { Table } from 'primeng/table';
import { CotizacionesService } from '../../service/cotizaciones.service';
import { ProductosService } from '../../service/Productos.service';
import { Producto } from '../../api/product';
import { PlazosService } from '../../service/plazos.service';
import { Plazo } from '../../api/plazo';

@Component({
    selector: 'app-cotizaciones',
    templateUrl: './cotizaciones.component.html',
    styleUrl: './cotizaciones.component.scss',
    providers: [MessageService]
})
export class CotizacionesComponent {

    // productDialog: boolean = false;
    cotizacionDialog: boolean = false;

    // deleteProductDialog: boolean = false;
    deleteCotizacionDialog: boolean = false;

    // deleteProductsDialog: boolean = false;
    deletecotizacionsDialog: boolean = false;

    cotizacions: Cotizacion[] = [];

    cotizacion: Cotizacion = {};

    selectedCotizacions: Cotizacion[] = [];

    submitted: boolean = false;

    productos: Producto[] | undefined;
    selectedProductos: Producto | undefined;

    plazos: Plazo[] | undefined;
    selectedplazos: Plazo | undefined;
    loading: boolean = false;

    // searchTerm: string = '';
    // filteredProducts: any[] = [];
    // selectedProduct: any = null;
    // selectedPlazo: number = null;
    // abonoNormal: number = null;
    // abonoPuntual: number = null;

    constructor(
        private messageService: MessageService,
        private cotizacionesService: CotizacionesService,
        private productosService: ProductosService,
        private plazosSercices: PlazosService
    ) { }

    ngOnInit() {
        this.loading = true;
        this.cotizacionesService.getAllQuotations().subscribe(data => {
            this.cotizacions = data;
        });

        this.productosService.getAllProducts().subscribe(data => {
            this.productos = data;
        });

        this.plazosSercices.getAllTerms().subscribe(data => {
            this.plazos = data;
        });

        this.loading = false;
    }

    openNew() {
        this.cotizacion = {};
        this.submitted = false;
        this.cotizacionDialog = true;
    }

    deleteSelectedProducts() {
        this.deletecotizacionsDialog = true;
    }

    editProduct(cotizacion: Cotizacion) {
        this.cotizacion = { ...cotizacion };
        this.cotizacionDialog = true;
    }

    deleteProduct(cotizacion: Cotizacion) {
        this.deleteCotizacionDialog = true;
        this.cotizacion = { ...cotizacion };
    }

    confirmDeleteSelected() {
        this.loading = true;
        this.deletecotizacionsDialog = false;
        console.log(this.selectedCotizacions);

        const deleteRequests = this.selectedCotizacions.map(product => this.cotizacionesService.deleteQuotation(product.id_cotizacion));
        Promise.all(deleteRequests).then(() => {
            this.cotizacions = this.cotizacions.filter(product => !this.selectedCotizacions.includes(product));
            this.selectedCotizacions = [];
        }).catch(error => {
            console.error(error);
        });
        this.loading = false;
    }

    confirmDelete() {
        this.loading = true;
        this.deleteCotizacionDialog = false;

        this.cotizacionesService.deleteQuotation(this.cotizacion.id_cotizacion).subscribe(() => {
            this.cotizacions = this.cotizacions.filter(val => val.id_cotizacion !== this.cotizacion.id_cotizacion);
            this.cotizacion = {};
        }, error => {
            console.error(error);
        });
        this.loading = false;
    }

    hideDialog() {
        this.cotizacionDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.loading = true;
        this.submitted = true;

        // console.log(this.product);
        this.cotizacionesService.saveOrUpdateQuotation(this.cotizacion).subscribe(data => {
            // Aquí asumimos que data es un solo producto
            const index = this.cotizacions.findIndex(p => p.id_cotizacion === data.id_cotizacion);
            if (index !== -1) {
                // Actualizar el producto existente
                this.cotizacions[index] = data;
            } else {
                // Agregar un nuevo producto a la lista
                this.cotizacions.push(data);
            }
            // console.log(data);
            this.cotizacionDialog = false;

            this.cotizacion = {};
        });
        this.loading = false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    onProductoChange() {
        this.cotizacion.producto = this.selectedProductos;
        this.calculateAbonos();
    }

    onPlazoChange() {
        this.cotizacion.plazo = this.selectedplazos;
        this.calculateAbonos();
    }

    calculateAbonos() {
        if (this.cotizacion.producto && this.cotizacion.plazo) {
            const precio = this.cotizacion.producto.precio;
            const tasaNormal = this.cotizacion.plazo.tasa_normal;
            const tasaPuntual = this.cotizacion.plazo.tasa_puntual;
            const semanas = this.cotizacion.plazo.semanas;

            this.cotizacion.abono_normal = ((precio * tasaNormal) + precio) / semanas;
            this.cotizacion.abono_puntual = ((precio * tasaPuntual) + precio) / semanas;
        }
    }

}

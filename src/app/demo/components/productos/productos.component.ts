import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { Producto } from '../../api/product';
import { ProductosService } from '../../service/Productos.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-productos',
    templateUrl: './productos.component.html',
    styleUrl: './productos.component.scss',
    providers: [MessageService]
})
export class ProductosComponent {
    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Producto[] = [];

    product: Producto = {};

    selectedProducts: Producto[] = [];

    submitted: boolean = false;

    cols: any[] = [];





    constructor(
        private messageService: MessageService,
        private productosService: ProductosService
    ) { }

    ngOnInit() {
        this.productosService.getAllProducts().subscribe(data => {
            this.products = data;
        });


    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Producto) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: Producto) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        console.log(this.selectedProducts);

        const deleteRequests = this.selectedProducts.map(product => this.productosService.deleteProduct(product.id_producto));
        Promise.all(deleteRequests).then(() => {
            this.products = this.products.filter(product => !this.selectedProducts.includes(product));
            this.selectedProducts = [];
        }).catch(error => {
            console.error(error);
        });
    }

    confirmDelete() {
        this.deleteProductDialog = false;

        this.productosService.deleteProduct(this.product.id_producto).subscribe(() => {
            this.products = this.products.filter(val => val.id_producto !== this.product.id_producto);
            this.product = {};
        }, error => {
            console.error(error);
        });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        // console.log(this.product);
        this.productosService.saveOrUpdateProduct(this.product).subscribe(data => {
            // Aquí asumimos que data es un solo producto
            const index = this.products.findIndex(p => p.id_producto === data.id_producto);
            if (index !== -1) {
                // Actualizar el producto existente
                this.products[index] = data;
            } else {
                // Agregar un nuevo producto a la lista
                this.products.push(data);
            }
            // console.log(data);
            this.productDialog = false;

            this.product = {};
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}

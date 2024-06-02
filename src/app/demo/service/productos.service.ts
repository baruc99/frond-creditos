import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ProductosService {

    baseUrl = `${environment.baseUrl}`;

    constructor(private http: HttpClient) { }

    getAllProducts(): Observable<any> {
        return this.http.get(`${this.baseUrl}/producto`);
    }

    getProductById(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/producto/${id}`);
    }

    saveOrUpdateProduct(product: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/producto`, product);
    }

    deleteProduct(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/producto/${id}`);
    }

}

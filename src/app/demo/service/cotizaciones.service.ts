import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CotizacionesService {

    baseUrl = `${environment.baseUrl}`;

    constructor( private http: HttpClient ) { }

    getAllQuotations(): Observable<any> {
        return this.http.get(`${this.baseUrl}/cotizacion`);
    }

    getQuotationById(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/cotizacion/${id}`);
    }

    saveOrUpdateQuotation(quotation: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/cotizacion`, quotation);
    }

    deleteQuotation(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/cotizacion/${id}`);
    }

}

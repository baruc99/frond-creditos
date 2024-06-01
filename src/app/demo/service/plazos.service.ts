import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PlazosService {
    baseUrl = `${environment.baseUrl}`;


    constructor(private http: HttpClient) { }

    getAllTerms(): Observable<any> {
        return this.http.get(`${this.baseUrl}/plazo`);
    }

    getTermById(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/plazo/${id}`);
    }

    saveOrUpdateTerm(term: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/plazo`, term);
    }

    deleteTerm(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/plazo/${id}`);
    }

}

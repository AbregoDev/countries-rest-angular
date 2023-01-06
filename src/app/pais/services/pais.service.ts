import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Country } from '../interfaces/pais.interface';

@Injectable({
   providedIn: 'root'
})
export class PaisService {

   private _baseApi: string = 'https://restcountries.com/v3.1';

   get params() {
      return new HttpParams()
         .set('fields', 'name,capital,cca2,flags,population');
   }

   constructor(private http: HttpClient) { }

   searchCountry(term: string): Observable<Country[]> {
      const url = `${this._baseApi}/name/${term}`;

      return this.http.get<Country[]>(url, { params: this.params });
   }

   searchCapital(term: string): Observable<Country[]> {
      const url = `${this._baseApi}/capital/${term}`;

      return this.http.get<Country[]>(url, { params: this.params });
   }

   searchCountryById(id: string): Observable<Country> {
      const params = new HttpParams()
         .set('fields',
            'name,capital,cca2,cca3,flags,population,translations,languages,currencies');

      const url = `${this._baseApi}/alpha/${id}`;

      return this.http.get<Country>(url, { params });
   }

   searchCountriesByRegion(region: string): Observable<Country[]> {
      const url = `${this._baseApi}/region/${region}`;

      return this.http.get<Country[]>(url, { params: this.params });
   }
}

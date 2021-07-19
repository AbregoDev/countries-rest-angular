import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
   selector: 'app-por-pais',
   templateUrl: './por-pais.component.html',
   styles: [
      `
      li {
         cursor: pointer;
      }
      `
   ]
})
export class PorPaisComponent {

   hayError: boolean = false;
   termino: string = '';
   countries: Country[] = [];
   suggestedCountries: Country[] = [];
   showSuggestions: boolean = false;

   constructor(private paisService: PaisService) { }

   buscar(termino: string) {
      this.hayError = false;
      this.termino = termino;
      this.showSuggestions = false;

      this.paisService.searchCountry(this.termino)
         .subscribe(countries => {
            this.countries = countries;
         }, err => {
            this.hayError = true;
            this.countries = [];
         });
   }

   sugerencias(termino: string): void {
      this.hayError = false;
      this.termino = termino;
      this.showSuggestions = true;

      this.paisService.searchCountry(termino)
         .subscribe(countries => {
            this.suggestedCountries = countries.splice(0, 5);
         }, err => {
            this.suggestedCountries = [];
         });
   }
}

import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
   selector: 'app-por-region',
   templateUrl: './por-region.component.html',
   styles: [
      `
     button {
        margin-right: 4px;
     }
     `
   ]
})
export class PorRegionComponent {

   regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
   regionActiva: string = '';
   countries: Country[] = [];

   constructor(private paisService: PaisService) { }

   activarRegion(region: string) {
      // Just update when region is differente
      if (region !== this.regionActiva) {
         this.regionActiva = region;
         this.countries = [];

         // Populate table
         this.paisService.searchCountriesByRegion(region)
            .subscribe(countries => this.countries = countries)
      }
   }

   getButtonStyle(region: string) {
      return (region === this.regionActiva)
         ? 'btn btn-primary'
         : 'btn btn-outline-primary';
   }

}

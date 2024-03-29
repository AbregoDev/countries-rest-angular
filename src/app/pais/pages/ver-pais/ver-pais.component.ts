import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';
import { switchMap, tap } from "rxjs/operators";
import { Country } from '../../interfaces/pais.interface';

@Component({
    selector: 'app-ver-pais',
    templateUrl: './ver-pais.component.html',
    styles: [
    ]
})
export class VerPaisComponent implements OnInit {

    country!: Country;

    constructor(
        private activatedRoute: ActivatedRoute,
        private paisService: PaisService,
    ) { }

    ngOnInit(): void {
        this.activatedRoute.params
            .pipe(
                switchMap(({ id }) => this.paisService.searchCountryById(id)),
                tap(console.log)
            )
            .subscribe(country => {
                this.country = country;
            });
    }

}

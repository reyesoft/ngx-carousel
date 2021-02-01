import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'ngx-carrousel';

    public constructor(private http: HttpClient) {
        this.http.get('https://pokeapi.co/api/v2/pokemon?limit=4').subscribe((systems) => {
            console.log(systems)
        })
    }
}

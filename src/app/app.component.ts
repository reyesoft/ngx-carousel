import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user_comments } from './components/comment-card/user-comments';
import { filter } from 'rxjs/operators'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public userComments = user_comments;
    public systems: Array<any>;

    public constructor(private http: HttpClient) {
        this.http.get('https://api.saldo.com.ar/v3/systems')
            .subscribe((systems: any): void => {
                console.log('holassss')
                this.systems = systems.data;
            })
    }
}

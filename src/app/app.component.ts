import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user_comments } from './components/comment-card/user-comments';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public userComments = user_comments;

    public constructor() {}
}

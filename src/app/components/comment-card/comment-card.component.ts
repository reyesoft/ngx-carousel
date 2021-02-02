import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-comment-card',
    templateUrl: './comment-card.component.html',
    styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent {
    @Input() public image: string;
    @Input() public title: string;
    @Input() public content: string;
    @Input() public alt: string;
}

import { AfterViewInit, Component, Renderer2 } from '@angular/core';

@Component({
    selector: 'rs-carousel',
    templateUrl: './ngx-carousel.component.html',
    styleUrls: ['./ngx-carousel.component.scss']
})
export class NgxCarouselComponent implements AfterViewInit{

    public left: number = 0;
    public elements = [1, 2, 3, 4]
    public elementsVisible = [0, 1, 2];

    constructor(private renderer: Renderer2) {}

    public ngAfterViewInit() {
        // this.move();
    }

    public move(): void {
        let element = document.querySelector('.carousel-container');
        let children = document.querySelector('.carousel-container').children;

        this.setClass(document.querySelector('.carousel-container').children);

        setInterval(() => {
            this.removeClass(children);
            element.appendChild(children[0]);
            this.setClass(children);
            this.elementsVisible = this.elementsVisible.map((element): number => {
                return element + 1;
            })
        }, 3000)
    }

    public setClass(children): void {
        this.renderer.addClass(children[0], 'left-children')
        this.renderer.addClass(children[2], 'right-children')
        this.renderer.addClass(children[1], 'center-children')
    }

    public removeClass(children): void {
        this.renderer.removeClass(children[0], 'left-children');
        this.renderer.removeClass(children[2], 'right-children');
        this.renderer.removeClass(children[1], 'center-children');
    }
}1

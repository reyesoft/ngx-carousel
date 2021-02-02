import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, HostListener, Inject, Input, Renderer2 } from '@angular/core';
import { interval, Observable } from 'rxjs';

@Component({
    selector: 'rs-carousel',
    templateUrl: './ngx-carousel.component.html',
    styleUrls: ['./ngx-carousel.component.scss']
})
export class NgxCarouselComponent implements AfterViewInit{
    @Input() public animationTime: number = 3;
    @Input() public slideTIme: number = 2;
    @Input() public carouselClass: string = 'carousel-container';
    private carouselSons: HTMLCollection;
    private carouselContainer: Element;

    public constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {}

    public ngAfterViewInit() {
        this.runCarousel();
    }

    private runCarousel(): void {
        this.addDefaultSettings();
        this.setCenterClass(this.carouselSons);
        interval(this.animationTime * 1000)
        .subscribe(() => {
            console.log(this.carouselContainer)
            this.renderer.addClass(this.carouselContainer, 'animation');
                this.removeClass(this.carouselSons);
                this.setClassNextChildren(this.carouselSons);

                setTimeout(() => {
                    this.renderer.removeClass(this.carouselContainer, 'animation')
                    this.carouselContainer.appendChild(this.carouselSons[0]);
                    this.setCenterClass(this.carouselSons);
                }, this.slideTIme * 1000);
            })
    }

    private addDefaultSettings(): void {
        this.carouselContainer = this.document.querySelector('.carousel-container');
        console.log(this.carouselContainer)
        this.carouselSons = this.document.querySelector('.carousel-container').children;

    }

    @HostListener('window:resize', ['$event'])
    public onResize(event: any): void {
        let element = document.querySelector('.carousel-container');

        if (event.target.innerWidth >= 1200) {
            this.renderer.setStyle(element, 'width', (1200 - 32) / 3* 14 + 'px')
            return;
        }

        let width = (event.target.innerWidth - 32) / 3 * 14;

        this.renderer.setStyle(element, 'width', width + 'px')
    }

    private setCenterClass(children): void {
        this.renderer.addClass(children[1], 'center-children');
        this.renderer.setStyle(children[1], 'transition', 'all' + this.slideTIme + 's ease-in-out');
    }

    private setClassNextChildren(children): void {
        this.renderer.addClass(children[2], 'center-children');
        this.renderer.setStyle(children[1], 'transition', 'all' + this.slideTIme + 's ease-in-out');
    }

    private removeClass(children): void {
        this.renderer.removeClass(children[1], 'center-children');
    }
}1

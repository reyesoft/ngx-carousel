import { AfterViewInit, Component, ElementRef, HostListener, Input, Renderer2, ViewChild } from '@angular/core';
import { interval } from 'rxjs';

@Component({
    selector: 'ngx-carousel',
    templateUrl: './ngx-carousel.component.html',
    styleUrls: ['./ngx-carousel.component.scss']
})
export class NgxCarouselComponent implements AfterViewInit{
    @Input() public animationTime: number = 3;
    @Input() public slideTime: number = .4;
    @Input() public carouselClass: string = 'carousel-container';
    @Input() public maxWidth: number = 1200;
    @Input() public sidePadding: number = 16;
    @Input() public opacityElementSecondary: number = 0.25;
    @Input() public moveItem: boolean = false;
    @Input() public movement: boolean = false;
    @Input() public isControls: boolean = false;
    @Input() public isAutoplay: boolean = true;
    @ViewChild('ngxCarousel', { static: true }) public ngxCarousel: undefined | ElementRef;
    @ViewChild('carouselContainer', { static: true }) public carouselContainer: undefined | ElementRef;
    private childrenCarousel: HTMLCollection;
    private quantityChildrenCarousel: number;
    private quantityColumns: number = 3;
    private cubicBezier: string = 'cubic-bezier(0.4, 0.0, 0.2, 1)';
    private auxMaxWidth: number;

    public constructor(private renderer: Renderer2) {}

    public ngAfterViewInit() {
        this.addDefaultSettings();
        this.setStylesOfComponents();
        this.setCarouselContainerWidthInitial();
        this.runCarousel();
    }

    private runCarousel(): void {
        if (this.childrenCarousel.length === 0) {
            return;
        }

        this.setCenterClass(this.childrenCarousel);
        if(this.isAutoplay){
            interval(this.animationTime * 1000)
                .subscribe(() => {
                    this.prevItem()
                })
        }
    }

    private addDefaultSettings(): void {
        this.childrenCarousel = this.carouselContainer.nativeElement.children;
        this.quantityChildrenCarousel =  Array.from(this.childrenCarousel).length;
        this.auxMaxWidth = this.maxWidth;
    }

    private setTransitionStyleCarousel(direction: string): void {
        let translate = this.calculateSizeElementCarousel(this.maxWidth, this.quantityColumns);
        switch (direction) {
            case 'prev':
                this.renderer.setStyle(
                    this.carouselContainer.nativeElement,
                    'transform',
                    `translateX(-${translate}px)`
                );
                break;
            case 'next':
                this.renderer.setStyle(
                    this.carouselContainer.nativeElement,
                    'transform',
                    `translateX(${translate}px)`
                );
                break;
        }
        this.renderer.setStyle(
            this.carouselContainer.nativeElement,
            'transition',
            'all ' + this.slideTime + 's ' + this.cubicBezier
        );
    }

    private removeTransitionStyleCarousel(): void {
        this.renderer.setStyle(this.carouselContainer.nativeElement, 'transform', 'translateX(0)');
        this.renderer.removeStyle(this.carouselContainer.nativeElement, 'transition');
    }

    private setStylesOfComponents(): void {
        this.renderer.setStyle(this.ngxCarousel.nativeElement, 'max-width', this.maxWidth + 'px');
        this.renderer.setStyle(this.carouselContainer.nativeElement, 'grid-template-columns', `repeat(${this.quantityChildrenCarousel}, 1fr)`);

        Array.from(this.childrenCarousel).forEach((children): void => {
            this.renderer.setStyle(children, 'transition', 'all ' + this.slideTime + 's ' + this.cubicBezier);
        });
    }

    private setCarouselContainerWidthInitial(): void {
        if (window.innerWidth < 600) {
            this.quantityColumns = 1;
            this.setStyleCarouselContainer(window.innerWidth);
            this.maxWidth = window.innerWidth;

            return;
        }

        if (window.innerWidth < this.auxMaxWidth) {
            this.setStyleCarouselContainer(window.innerWidth);
            this.maxWidth = window.innerWidth;

            return;
        }

        this.setStyleCarouselContainer(this.maxWidth);
    }

    private setStyleCarouselContainer(maxWidth: number): void {
        console.log('render ', this.renderer)
        this.renderer.setStyle(
            this.carouselContainer.nativeElement,
            'width',
            (this.calculateSizeElementCarousel(maxWidth, this.quantityColumns) * this.quantityChildrenCarousel) + 'px'
        );
    }

    private calculateSizeElementCarousel(width: number, quantityColumns: number): number {
        return (width - (this.sidePadding * 1)) / quantityColumns;
    }

    @HostListener('window:resize', ['$event'])
    public onResize(event: any): void {

        if (event.target.innerWidth >= this.auxMaxWidth) {
            this.quantityColumns = 3;
            this.setStyleCarouselContainer(this.maxWidth);

            return;
        }

        this.maxWidth = event.target.innerWidth

        if (event.target.innerWidth >= 600) {
            this.quantityColumns = 3;
            this.setStyleCarouselContainer(event.target.innerWidth);

            return;
        }

        this.quantityColumns = 1;
        this.setStyleCarouselContainer(event.target.innerWidth);
    }

    private setCenterClass(children): void {
        switch (this.quantityColumns) {
            case 3:
                this.renderer.addClass(children[1], 'center-children');
                break;
            case 5: 
                this.renderer.addClass(children[2], 'center-children');
                break;
        }
    }

    private setClassChildren(children, direction: string): void {
        if (this.quantityColumns === 1) {
            return;
        }
        switch (direction) {
            case 'next':
                this.renderer.addClass(children[1], 'center-children');
                break;
            case 'prev':
                this.renderer.addClass(children[0], 'center-children');
                break;
        }
    }

    private removeClass(children): void {
        this.renderer.removeClass(children[1], 'center-children');
    }

    public prevItem(): void {
        this.moveItem = true;
        this.setTransitionStyleCarousel('prev');
        
        if(this.moveItem === true){
            setTimeout(() => {
                this.setClassChildren(this.childrenCarousel, 'next');
                this.removeClass(this.childrenCarousel);
                this.removeTransitionStyleCarousel();
                this.carouselContainer.nativeElement.appendChild(this.childrenCarousel[0]);
                this.setCenterClass(this.childrenCarousel);
                this.moveItem = false;
            }, this.slideTime * 600);
        }
    }

    public nextItem(): void {
        this.moveItem = true;
        this.setTransitionStyleCarousel('next');
        
        if(this.moveItem === true){
            setTimeout(() => {
                this.setClassChildren(this.childrenCarousel, 'prev');
                this.removeClass(this.childrenCarousel);
                this.removeTransitionStyleCarousel();
                this.childrenCarousel[0].before(this.childrenCarousel[this.childrenCarousel.length - 1]);
                this.setCenterClass(this.childrenCarousel);
                this.moveItem = false;
            }, this.slideTime * 600);
        }
    }
}

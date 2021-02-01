import { AfterViewInit, Component, Renderer2 } from '@angular/core';

@Component({
    selector: 'rs-carousel',
    templateUrl: './ngx-carousel.component.html',
    styleUrls: ['./ngx-carousel.component.scss']
})
export class NgxCarouselComponent implements AfterViewInit{

    public left: number = 0;
    public elements = [
        'https://www.muycomputerpro.com/wp-content/uploads/2012/09/informatica.jpg',
        'https://escuelainenka.com/wp-content/uploads/2018/12/master-en-informatica-forense.jpg',
        'https://www.mlgcomponentes.com/wp-content/uploads/2019/08/imagen-articulo-nombres.gif',
        'https://www.mlgcomponentes.com/wp-content/uploads/2019/08/imagen-articulo-nombres.gif']
    public elementsVisible = [0, 1, 2];

    constructor(private renderer: Renderer2) {
    }

    public ngAfterViewInit() {
        console.log(document.getElementById('ngx-carousel').children)
        this.move();
    }

    public move(): void {
        let element = document.querySelector('.carousel-container');
        let children = document.querySelector('.carousel-container').children;
        this.setClass(children)
        console.log(children)
        setInterval(() => {
            this.left += 33;
            console.log('holas')
            this.renderer.setStyle(element, 'left', -this.left + '%');
            this.renderer.removeClass(children[this.elementsVisible[0]], 'left-children')
            this.renderer.removeClass(children[this.elementsVisible[2]], 'right-children')
            this.renderer.removeClass(children[this.elementsVisible[1]], 'center-children')
            this.elementsVisible = this.elementsVisible.map((element): number => {
                return element + 1;
            })
            children.insertBefore(children[0], null)
            this.setClass(children)
        }, 3000)
        // element.style.left
    }

    public setClass(children): void {
        console.log(this.elementsVisible, children)
        this.renderer.addClass(children[this.elementsVisible[0]], 'left-children')
        this.renderer.addClass(children[this.elementsVisible[2]], 'right-children')
        this.renderer.addClass(children[this.elementsVisible[1]], 'center-children')
    }
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxCarouselComponent } from './ngx-carousel.component';



@NgModule({
    declarations: [NgxCarouselComponent],
    exports: [NgxCarouselComponent],
    imports: [CommonModule]
})
export class NgxCarouselModule { }

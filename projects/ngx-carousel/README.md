# NgxCarousel

A simple library for creating carousel for Angular

## Get started

1. Run ```bash yarn add ngx-carousel ``` or ```bash npm install ngx-carousel ```

2. Import NgxCarouselModule into module a module which declares a component intended to have a carousel

```
import { NgxCarouselModule } from 'ngx-carousel';

@NgModule({
  imports: [ NgxCarouselModule ]
})
export class ExampleModule { }

```

3. Usage

```
<ngx-carousel
    [animationTime]="..."
    [slideTIme]="..."
    [maxWidth]="...">

    <div>Slide 1</div>
    <div>Slide 2</div>
    <div>Slide 3</div>
    <div>Slide 4</div>
    <div>Slide 5</div>

</ngx-carousel>
```

## Local demo app

```bash
git clone https://github.com/reyesoft/ngx-carousel.git
cd ngx-carousel
yarn
yarn start
```

## Build

Run `yarn build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ngx-carousel`, go to the dist folder `cd dist/ngx-carousel` and run `npm publish`.

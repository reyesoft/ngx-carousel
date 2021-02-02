import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxCarouselModule } from 'projects/ngx-carousel/src/public-api';
import { HttpClientModule } from '@angular/common/http';
import { CommentCardComponent } from './components/comment-card/comment-card.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    CommentCardComponent
  ],
  imports: [
    BrowserModule,
    NgxCarouselModule,
    HttpClientModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

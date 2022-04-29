import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { HowComponent } from './pages/how/how.component';
import { AboutComponent } from './pages/about/about.component';
import { ModeComponent } from './componants/mode/mode.component';
import { GameComponent } from './pages/game/game.component';

// import FastAverageColor from 'fast-average-color';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HowComponent,
    AboutComponent,
    ModeComponent,
    GameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    // FastAverageColor,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Logger, Options as LoggerOptions, Level as LoggerLevel } from 'angular2-logger/core';

import { RouterModule, Router } from '@angular/router';

import { OxCellarRoutingModule } from './routing/ox-cellar-routing.module';

import { OxCellarApiService } from './wine/ox-cellar-api.service';
import { OxCountriesService } from './country/ox-countries.service';

import { AppComponent } from './app.component';
import { OxHomeComponent } from './ox-home/ox-home.component';
import { OxWinesListComponent } from './wine/ox-wines-list/ox-wines-list.component';
import { OxWineViewComponent } from './wine/ox-wine-view/ox-wine-view.component';
import { OxWineEditComponent } from './wine/ox-wine-edit/ox-wine-edit.component';
import { OxPageNotFoundComponent } from './ox-page-not-found/ox-page-not-found.component';
import { OxWineItemComponent } from './wine/ox-wine-item/ox-wine-item.component';
import { WineResolver } from './wine/wine-resolver';
import { ImgWineResolver } from './wine/img-wine-resolver';
import { OxLoadingComponent } from './ox-loading/ox-loading.component';

@NgModule({
  declarations: [
    AppComponent,
    OxHomeComponent,
    OxWinesListComponent,
    OxWineViewComponent,
    OxWineEditComponent,
    OxPageNotFoundComponent,
    OxWineItemComponent,
    OxLoadingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule,
    OxCellarRoutingModule,
    RouterModule,
    BrowserAnimationsModule
  ],
  providers: [
    WineResolver,
    ImgWineResolver,
    OxCellarApiService,
    OxCountriesService,
    Logger,
    { provide: LoggerOptions, useValue: { level: LoggerLevel.LOG } }
  ],
  bootstrap: [AppComponent],
  entryComponents: [OxLoadingComponent]
})
export class AppModule {
  constructor() {}
}

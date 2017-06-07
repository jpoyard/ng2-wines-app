import { CountriesResolver } from '../country/countries-resolver';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { OxPageNotFoundComponent } from '../ox-page-not-found/ox-page-not-found.component';

import { OxHomeComponent } from '../ox-home/ox-home.component';

import { OxWinesListComponent } from '../wine/ox-wines-list/ox-wines-list.component';
import { OxWineViewComponent } from '../wine/ox-wine-view/ox-wine-view.component';
import { OxWineEditComponent } from '../wine/ox-wine-edit/ox-wine-edit.component';
import { WineResolver } from '../wine/wine-resolver';

const appRoutes: Routes = [
  { path: 'home', component: OxHomeComponent },
  {
    path: 'wines', component: OxWinesListComponent,
    children: [
      {
        path: ':id/view', component: OxWineViewComponent,
        resolve: { wine: WineResolver }
      },
      {
        path: ':id/edit', component: OxWineEditComponent,
        resolve: { wine: WineResolver, countries: CountriesResolver }
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: OxPageNotFoundComponent }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: []
})
export class OxCellarRoutingModule { }

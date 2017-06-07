import { OxCellarRoutingModule } from '../../routing/ox-cellar-routing.module';
import { ActivatedRoute } from '@angular/router';
import { InputDecorator } from '@angular/core/src/metadata/directives';
import { Component, OnInit } from '@angular/core';
import { ElementRef, HostListener, EventEmitter, Input, Output } from '@angular/core';

import { OxCellarApiService } from '../ox-cellar-api.service';
import { Wine } from '../wine';

import { OxCountriesService } from '../../country/ox-countries.service';
import { Country } from '../../country/country';

import { Observable } from 'rxjs/Rx';
import { select } from '@angular-redux/store';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/root.types';
import { WinesActions } from '../wines.actions';

@Component({
  selector: 'app-ox-wine-item',
  templateUrl: './ox-wine-item.component.html',
  styleUrls: ['./ox-wine-item.component.css']
})
export class OxWineItemComponent implements OnInit {
  @Input() wine: Wine;
  @select(['wines', 'selected']) readonly selected$: Observable<Wine>;

  private active: boolean;
  private imgSource: string;
  private country: Country;

  constructor(
    private el: ElementRef,
    private route: ActivatedRoute,
    private oxCountriesService: OxCountriesService,
    private oxCellarApiService: OxCellarApiService,
    private ngRedux: NgRedux<IAppState>,
    private actions: WinesActions
  ) { }

  ngOnInit() {
    this.active = false;
    this.oxCountriesService.get(this.wine.country).then(
      country => this.country = country
    );
    this.imgSource = this.oxCellarApiService.getImageSourceUrl(this.wine.id);
    this.selected$.subscribe(value => this.active = (value === this.wine));
  }

  get countryLabel() {
    return this.country ? this.country.en : undefined;
  }

  select(event) {
    event.preventDefault();
    this.ngRedux.dispatch(this.actions.selectWine(this.route, this.wine));
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.active) {
      this.el.nativeElement.style.cursor = 'pointer';
    } else {
      this.el.nativeElement.style.cursor = 'not-allowed';
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.cursor = null;
  }
}

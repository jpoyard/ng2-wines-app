import { Router, ActivatedRoute } from '@angular/router';
import { InputDecorator } from '@angular/core/src/metadata/directives';
import { Component, OnInit } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { ElementRef, HostListener, EventEmitter, Input, Output } from '@angular/core';

import { OxCellarApiService } from '../ox-cellar-api.service';
import { Wine } from '../wine';

import { OxCountriesService } from '../../country/ox-countries.service';
import { Country } from '../../country/country';

@Component({
  selector: 'app-ox-wine-item',
  templateUrl: './ox-wine-item.component.html',
  styleUrls: ['./ox-wine-item.component.css']
})
export class OxWineItemComponent implements OnInit {
  @Input() wine: Wine;
  @Input() imgSource: string;
  @Input() active: false;
  private _country: Country;

  constructor(
    private logger: Logger,
    private el: ElementRef,
    private router: Router,
    private route: ActivatedRoute,
    private OxCountriesService: OxCountriesService
  ) { }

  ngOnInit() {
    this.OxCountriesService.get(this.wine.country).then(
      country => this._country = country
    );
  }

  get country() {
    return this._country ? this._country.en : undefined;
  }

  open(event) {
    event.preventDefault();
    this.router.navigate([this.wine.id, 'view'], { relativeTo: this.route });
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

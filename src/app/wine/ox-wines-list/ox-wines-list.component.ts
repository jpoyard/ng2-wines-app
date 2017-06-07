import { OxLoadingComponent } from '../../ox-loading/ox-loading.component';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute } from '@angular/router';
import { MdDialogModule, MdDialog, MdDialogRef } from '@angular/material';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/merge';

import { select } from '@angular-redux/store';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/root.types';
import { WinesActions } from '../wines.actions';

import { Wine } from '../wine';

@Component({
  selector: 'app-ox-wines-list',
  templateUrl: './ox-wines-list.component.html',
  styleUrls: ['./ox-wines-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OxWinesListComponent implements OnInit {
  @select(['wines', 'items']) readonly wines$: Observable<Wine[]>;
  @select(['wines', 'loading']) readonly loading$: Observable<boolean>;
  @select(['wines', 'error']) readonly error$: Observable<any>;

  private queryForm: FormGroup;
  private _dialogRef: MdDialogRef<OxLoadingComponent>;

  constructor(
    private router: Router,
    private ngRedux: NgRedux<IAppState>,
    private actions: WinesActions,
    private fb: FormBuilder,
    public dialog: MdDialog
  ) { }

  ngOnInit() {
    this.createForm();

    this.loading$.subscribe(
      loading => {
        if (loading) {
          this.pendingStart();
        } else {
          this.pendingStop();
        }
      }
    );
  }

  private pendingStart() {
    this._dialogRef = this.dialog.open(OxLoadingComponent, {
      height: '150px',
      width: '150px',
    });
  }

  private pendingStop() {
    if (this._dialogRef) {
      this._dialogRef.close();
      this._dialogRef = null;
    }
  }

  createForm() {
    this.queryForm = this.fb.group({
      filter: '',
      sorting: 'name:1'
    });

    const query$ = this.queryForm.valueChanges
      .startWith({})
      .subscribe(queryForm => this.loadWines(queryForm.filter, queryForm.sorting));
  }

  loadWines(filter: string, sorting: string) {
    const filters = filter ? [`name:${filter}`] : [];
    this.ngRedux.dispatch(this.actions.loadWines(filters, sorting));
  }
}

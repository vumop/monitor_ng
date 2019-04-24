import { Component, OnInit, Input, OnDestroy } from "@angular/core";

import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl
} from "@angular/forms";
import { MatSnackBar } from "@angular/material";

import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  filter
} from "rxjs/operators";
import { isString } from "lodash";

import { MapService } from "./../../../services/map.service";

@Component({
  selector: "app-search-panel",
  templateUrl: "./search-panel.component.html",
  styleUrls: ["./search-panel.component.css"]
})
export class SearchPanelComponent implements OnInit, OnDestroy {
  @Input()
  public drawer: any;

  public searchForm: FormGroup;

  public districtOptions: Array<string>;

  public loading: boolean;

  private subscription = [];

  get formControls(): {
    [key: string]: AbstractControl;
  } {
    return this.searchForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private mapService: MapService,
    private snackBar: MatSnackBar
  ) {
    this.searchForm = this.formBuilder.group({
      ctv: [""],
      zkod: [""],
      district: [""]
    });

    this.districtOptions = [];
  }

  ngOnInit() {
    this.subscription.push(
      this.searchForm.controls.district.valueChanges
        .pipe(
          debounceTime(400),
          distinctUntilChanged(),
          switchMap(term => {
            if (term != "" && isString(term)) {
              this.loading = true;
              return this.mapService.searchDistrict(term);
            } else {
              this.districtOptions = [];
            }
          })
        )
        .subscribe((res: any) => {
          this.districtOptions = res.searchingData;
          this.loading = false;
        })
    );
  }

  ngOnDestroy() {
    this.subscription.map(sub => sub.unsubscribe());
  }

  public onSubmit = (value: any): void => {
    if (!this.searchForm.invalid) {
      this.loading = true;
      this.subscription.push(
        this.mapService
          .searchDpb(value.ctv, value.zkod)
          .subscribe((result: any) => {
            if (result.success) {
              this.mapService.zoomTo(result.data.geom);
              this.loading = false;
            } else {
              this.snackBar.open("Vyhledávání DPB", result.msg, {
                duration: 3500
              });
              this.loading = false;
            }
          })
      );
    }
  };

  public districtSelect = $event => {
    this.mapService.zoomTo($event.option.value.geom);
  };

  public displayFn = (res): string => (res ? res.name : null);
}

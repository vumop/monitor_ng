import { Component, OnInit, Input } from "@angular/core";

import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl
} from "@angular/forms";

import { MapService } from "./../../../services/map.service";

@Component({
  selector: "app-search-panel",
  templateUrl: "./search-panel.component.html",
  styleUrls: ["./search-panel.component.css"]
})
export class SearchPanelComponent implements OnInit {
  @Input()
  public drawer: any;

  public searchForm: FormGroup;

  get formControls(): {
    [key: string]: AbstractControl;
  } {
    return this.searchForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private mapService: MapService
  ) {
    this.searchForm = this.formBuilder.group({
      ctv: ["720-1070"],
      zkod: ["5304"]
    });
  }

  ngOnInit() {}

  onSubmit(value: any): void {
    if (!this.searchForm.invalid) {
      this.mapService
        .searchDpb(value.ctv, value.zkod)
        .subscribe((result: any) => {
          if (result.success) {
            this.mapService.zoomTo(result.data.geom);
          } else {
            console.log(result);
          }
        });
    }
  }
}

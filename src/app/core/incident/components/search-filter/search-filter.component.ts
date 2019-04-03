import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-search-filter",
  templateUrl: "./search-filter.component.html",
  styleUrls: ["./search-filter.component.css"]
})
export class SearchFilterComponent implements OnInit {
  @Input() parentForm: FormGroup;

  @Output() parentApplyFilter = new EventEmitter<void>();

  @Output() parentSearchDistrict = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  public search(value) {
    this.parentSearchDistrict.emit(value);
  }

  public clear(value) {
    this.parentApplyFilter.emit(value);
  }
}

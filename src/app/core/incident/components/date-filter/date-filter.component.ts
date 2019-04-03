import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-date-filter",
  templateUrl: "./date-filter.component.html",
  styleUrls: ["./date-filter.component.css"]
})
export class DateFilterComponent implements OnInit {
  @Input() parentForm: FormGroup;

  @Output() parentApplyDateFilter = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  public onChange(value) {
    this.parentApplyDateFilter.emit(value);
  }

  public clear(value) {
    this.parentApplyDateFilter.emit(value);
  }
}

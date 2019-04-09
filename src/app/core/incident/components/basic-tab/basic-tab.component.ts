import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";

import { Store, Select } from "@ngxs/store";
import { delay } from "rxjs/operators";

@Component({
  selector: "app-basic-tab",
  templateUrl: "./basic-tab.component.html",
  styleUrls: ["./basic-tab.component.css"]
})
export class BasicTabComponent implements OnInit {
  @Output() parentSetLoading = new EventEmitter<boolean>();

  public data: object;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store
      .select(state => state.Detail.basic)
      .subscribe(data => {
        this.data = data;
        setTimeout(() => this.parentSetLoading.emit(false));
      });
  }
}

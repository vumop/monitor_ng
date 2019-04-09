import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";

import { Store, Select } from "@ngxs/store";

@Component({
  selector: "app-lpis-tab",
  templateUrl: "./lpis-tab.component.html",
  styleUrls: ["./lpis-tab.component.css"]
})
export class LpisTabComponent implements OnInit {

  @Output() parentSetLoading = new EventEmitter<boolean>();

  public data: Array<object>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store
      .select(state => state.Detail.lpis)
      .subscribe(data => {
        this.data = data;
        setTimeout(() => this.parentSetLoading.emit(false));
      });
  }
}

import { Component, OnInit, Input } from "@angular/core";

import { Store, Select } from "@ngxs/store";

@Component({
  selector: "app-basic-tab",
  templateUrl: "./basic-tab.component.html",
  styleUrls: ["./basic-tab.component.css"]
})
export class BasicTabComponent implements OnInit {

  public data: object;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store
      .select(state => state.Detail.basic)
      .subscribe(data => {
        this.data = data;
      });
  }
}

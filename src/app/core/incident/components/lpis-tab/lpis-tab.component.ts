import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Input,
  Output
} from "@angular/core";

import { Store, Select } from "@ngxs/store";

import { isEmpty } from "lodash";

@Component({
  selector: "app-lpis-tab",
  templateUrl: "./lpis-tab.component.html",
  styleUrls: ["./lpis-tab.component.css"]
})
export class LpisTabComponent implements OnInit, OnDestroy {
  @Output() parentSetLoading = new EventEmitter<boolean>();

  public data: Array<object>;

  private subscription;

  constructor(private store: Store) {
    this.data = [];
  }

  ngOnInit() {
    this.subscription = this.store
      .select(state => state.Detail.lpis)
      .subscribe(data => {
        if (data) {
          this.data = data;
          setTimeout(() => this.parentSetLoading.emit(false));
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

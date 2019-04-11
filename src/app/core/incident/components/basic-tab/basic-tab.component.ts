import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Input,
  Output
} from "@angular/core";

import { Store, Select } from "@ngxs/store";
import { delay } from "rxjs/operators";

import { isEmpty } from "lodash";

@Component({
  selector: "app-basic-tab",
  templateUrl: "./basic-tab.component.html",
  styleUrls: ["./basic-tab.component.css"]
})
export class BasicTabComponent implements OnInit, OnDestroy {
  @Output() parentSetLoading = new EventEmitter<boolean>();

  public data: { [key: string]: any };
  private subscription;

  constructor(private store: Store) {}

  ngOnInit() {
    this.subscription = this.store
      .select(state => state.Detail.basic)
      .subscribe(data => {
        this.data = data;
        setTimeout(() => this.parentSetLoading.emit(false));
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

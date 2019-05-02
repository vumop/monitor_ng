import { Component, OnInit, Inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatTabChangeEvent,
  MatDialogRef
} from "@angular/material";
import { Router } from "@angular/router";

import { Store, Select } from "@ngxs/store";
import {
  GetDetail,
  ResetDetail,
  GetFotos,
  GetLpis
} from "../../../actions/detail.actions";

export interface DataModel {
  id_incident: number;
  navigateTo: string;
}

@Component({
  selector: "app-incident-detail",
  templateUrl: "./incident-detail.component.html",
  styleUrls: ["./incident-detail.component.css"]
})
export class IncidentDetailComponent implements OnInit {
  public loading: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DataModel,
    public dialogRef: MatDialogRef<IncidentDetailComponent>,
    private store: Store,
    private router: Router
  ) {
    this.loading = true;
  }

  ngOnInit() {
    this.store.dispatch(new GetDetail(this.data.id_incident));
    /**
     * after close dialog navigate to the route parametr
     */
    this.dialogRef.afterClosed().subscribe(() => {
      this.router.navigate([this.data.navigateTo]);
      this.store.dispatch(new ResetDetail());
    });
  }

  public onTabChange($event: MatTabChangeEvent) {
    switch ($event.index) {
      case 0:
        this.setLoading(true);
        this.store.dispatch(new GetDetail(this.data.id_incident));
        break;
      case 1:
        this.setLoading(true);
        this.store.dispatch(new GetLpis(this.data.id_incident));
        break;
      case 2:
        this.setLoading(true);
        this.store.dispatch(new GetFotos(this.data.id_incident));
        break;
    }
  }

  public setLoading(val: boolean) { console.log('set loding',this.loading);
    this.loading = val;
  }
}

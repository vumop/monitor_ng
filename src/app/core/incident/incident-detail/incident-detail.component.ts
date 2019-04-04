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

export interface LoaderModel {
  basic: boolean;
  fotos: boolean;
  lpis: boolean;
}

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
  public loader: LoaderModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DataModel,
    public dialogRef: MatDialogRef<IncidentDetailComponent>,
    private store: Store,
    private router: Router
  ) {
    this.loader = {
      basic: false,
      fotos: false,
      lpis: false
    };
  }

  ngOnInit() {
    this.store.dispatch(new GetDetail(this.data.id_incident));

    this.store
      .select(state => state.Detail.loading)
      .subscribe(data => {
        this.loader.basic = data;
      });
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
      case 1:
        if (!this.loader.lpis) {
          this.store.dispatch(new GetLpis(this.data.id_incident));
          this.loader.lpis = true;
        }
        break;
      case 2:
        if (!this.loader.fotos) {
          this.store.dispatch(new GetFotos(this.data.id_incident));
          this.loader.fotos = true;
        }
        break;
    }
  }
}

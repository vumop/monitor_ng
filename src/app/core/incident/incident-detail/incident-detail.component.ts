import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { MatTabChangeEvent } from "@angular/material";

import { Store, Select } from "@ngxs/store";
import {
  GetDetail,
  ResetDetail,
  GetFotos,
  GetLpis
} from "../../../actions/detail.actions";

import { MatDialogRef } from "@angular/material";

export interface FotoViewerModel {
  activeIndex: number;
  countFotos: number;
}

export interface FotoModel {
  popis: string;
  soubor: string;
}

export interface LoaderModel {
  basic: boolean;
  fotos: boolean;
  lpis: boolean;
}

@Component({
  selector: "app-incident-detail",
  templateUrl: "./incident-detail.component.html",
  styleUrls: ["./incident-detail.component.css"]
})
export class IncidentDetailComponent implements OnInit {
  public detail: object;
  public fotos: Array<FotoModel>;
  public lpis: Array<object>;
  public loader: LoaderModel;

  public fotoViewer: FotoViewerModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<IncidentDetailComponent>,
    private store: Store
  ) {
    this.lpis = [];
    this.fotos = [];
    this.loader = {
      basic: false,
      fotos: false,
      lpis: false
    };
    this.fotoViewer = {
      activeIndex: 0,
      countFotos: 0
    };
  }

  ngOnInit() {
    this.store.dispatch(new GetDetail(this.data.id_incident));

    this.store
      .select(state => state.Detail.basic)
      .subscribe(data => {
        this.detail = data;
      });

    this.store
      .select(state => state.Detail.loading)
      .subscribe(data => {
        this.loader.basic = data;
      });

    this.dialogRef
      .afterClosed()
      .subscribe(() => this.store.dispatch(new ResetDetail()));
  }

  public prevFoto(): void {
    if (this.fotoViewer.activeIndex > 0) {
      this.fotoViewer.activeIndex--;
    }
  }

  public nextFoto(): void {
    if (this.fotoViewer.activeIndex < this.fotoViewer.countFotos - 1) {
      this.fotoViewer.activeIndex++;
    }
  }

  public getUrlFoto(): string {
    return this.fotos[this.fotoViewer.activeIndex]
      ? `http://test65.vumop.cz/dev_monitoring/public/upload_/${
          this.data.id_incident
        }/foto/${this.fotos[this.fotoViewer.activeIndex].soubor}`
      : ``;
  }

  public getDescFoto(): string {
    return this.fotos[this.fotoViewer.activeIndex]
      ? this.fotos[this.fotoViewer.activeIndex].popis
      : ``;
  }

  public onTabChange($event: MatTabChangeEvent) {
    switch ($event.index) {
      case 1:
        if (!this.loader.fotos) {
          this.store.dispatch(new GetFotos(this.data.id_incident));
        }
        this.store
          .select(state => state.Detail.fotos)
          .subscribe(data => {
            this.fotos = data;
            this.loader.fotos = true;
            if (this.fotos.length) {
              this.fotoViewer.activeIndex = 0;
              this.fotoViewer.countFotos = this.fotos.length;
            }
          });

        break;
      case 2:
        if (!this.loader.lpis) {
          this.store.dispatch(new GetLpis(this.data.id_incident));
        }
        this.store
          .select(state => state.Detail.lpis)
          .subscribe(data => {
            this.lpis = data;
            this.loader.lpis = true;
          });
        break;
    }
  }
}

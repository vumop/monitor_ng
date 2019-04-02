import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

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
  activeUrl: string;
  activeDesc: string;
  countFotos: number;
}

export interface FotoModel {
  popis: string;
  soubor: string;
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
  public loading: boolean;

  public fotoViewer: FotoViewerModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<IncidentDetailComponent>,
    private store: Store
  ) {
    this.fotoViewer = {
      activeIndex: null,
      activeUrl: "",
      activeDesc: "",
      countFotos: null
    };
  }

  ngOnInit() {
    this.store.dispatch(new GetDetail(this.data.id_incident));

    this.store.dispatch(new GetFotos(this.data.id_incident));

    this.store.dispatch(new GetLpis(this.data.id_incident));

    this.store
      .select(state => state.Detail)
      .subscribe(data => {
        this.loading = data.loading;

        this.detail = data.basic;
        this.fotos = data.fotos;

        if (this.fotos.length) {
          this.fotoViewer.activeIndex = 0;
          this.fotoViewer.activeUrl = this.fotos[
            this.fotoViewer.activeIndex
          ].soubor;
          this.fotoViewer.activeDesc = this.fotos[
            this.fotoViewer.activeIndex
          ].popis;
          this.fotoViewer.countFotos = this.fotos.length;
        }
        this.lpis = data.lpis;
      });

    this.dialogRef
      .afterClosed()
      .subscribe(() => this.store.dispatch(new ResetDetail()));
  }

  public prevFoto(): void {
    if (this.fotoViewer.activeIndex > 0) {
      this.fotoViewer.activeIndex--;
      this.fotoViewer.activeUrl = this.fotos[
        this.fotoViewer.activeIndex
      ].soubor;
      this.fotoViewer.activeDesc = this.fotos[
        this.fotoViewer.activeIndex
      ].popis;
    }
  }

  public nextFoto(): void {
    if (this.fotoViewer.activeIndex < (this.fotoViewer.countFotos - 1)) {
      this.fotoViewer.activeIndex++;
      this.fotoViewer.activeUrl = this.fotos[
        this.fotoViewer.activeIndex
      ].soubor;
      this.fotoViewer.activeDesc = this.fotos[
        this.fotoViewer.activeIndex
      ].popis;
    }
  }

  public getUrlFoto(): string {
    return this.fotoViewer.activeUrl
      ? `http://test65.vumop.cz/dev_monitoring/public/upload_/${
          this.data.id_incident
        }/foto/${this.fotoViewer.activeUrl}`
      : ``;
  }
}

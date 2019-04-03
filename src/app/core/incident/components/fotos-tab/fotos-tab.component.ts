import { Component, OnInit, Input } from "@angular/core";

import { Store, Select } from "@ngxs/store";

export interface FotoViewerModel {
  activeIndex: number;
  countFotos: number;
}

export interface FotoModel {
  popis: string;
  soubor: string;
}

@Component({
  selector: "app-fotos-tab",
  templateUrl: "./fotos-tab.component.html",
  styleUrls: ["./fotos-tab.component.css"]
})
export class FotosTabComponent implements OnInit {
  @Input() idIncident: number;

  public fotoViewer: FotoViewerModel;
  public fotos: Array<FotoModel>;

  constructor(private store: Store) {
    this.fotoViewer = {
      activeIndex: 0,
      countFotos: 0
    };
  }

  ngOnInit() {
    this.store
      .select(state => state.Detail.fotos)
      .subscribe(data => {
        this.fotos = data;

        if (this.fotos.length) {
          this.fotoViewer.activeIndex = 0;
          this.fotoViewer.countFotos = this.fotos.length;
        }
      });
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
          this.idIncident
        }/foto/${this.fotos[this.fotoViewer.activeIndex].soubor}`
      : ``;
  }

  public getDescFoto(): string {
    return this.fotos[this.fotoViewer.activeIndex]
      ? this.fotos[this.fotoViewer.activeIndex].popis
      : ``;
  }
}

import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Input,
  Output
} from "@angular/core";

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
export class FotosTabComponent implements OnInit, OnDestroy {
  @Input() idIncident: number;

  @Output() parentSetLoading = new EventEmitter<boolean>();

  public fotoViewer: FotoViewerModel;
  public fotos: Array<FotoModel>;

  private subscription;

  constructor(private store: Store) {
    this.fotoViewer = {
      activeIndex: 0,
      countFotos: 0
    };
  }

  ngOnInit() {
    this.subscription = this.store
      .select(state => state.Detail.fotos)
      .subscribe(data => {
        this.fotos = data;
        setTimeout(() => this.parentSetLoading.emit(false));

        if (this.fotos.length) {
          this.fotoViewer.activeIndex = 0;
          this.fotoViewer.countFotos = this.fotos.length;
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

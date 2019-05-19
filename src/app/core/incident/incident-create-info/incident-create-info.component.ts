import { Component, OnInit, Inject } from "@angular/core";

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatTabChangeEvent,
  MatDialogRef
} from "@angular/material";

import { Router } from "@angular/router";

import { DrawingService } from "../../../services/drawing.service";
import { IncidentCreateComponent } from "../incident-create/incident-create.component";
export interface DataModel {
  //onActivate: any;
  navigateTo: string;
  selectDeactivation: any;
  selectActivation: any;
}

@Component({
  selector: "app-incident-create-info",
  templateUrl: "./incident-create-info.component.html",
  styleUrls: ["./incident-create-info.component.css"]
})
export class IncidentCreateInfoComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DataModel,
    public dialogRef: MatDialogRef<IncidentCreateInfoComponent>,
    private router: Router,
    private drawingService: DrawingService,
    public dialog: MatDialog
  ) {}

  public onActivate = (): void => {
    this.data.selectDeactivation();
    this.drawingService.startDraw("Polygon");
    this.drawingService.getDraw().vectorClear = false;
    this.drawingService.getDraw().drawing.on("drawend", evt => {
      const dialogCreateRef = this.dialog.open(IncidentCreateComponent, {
        disableClose: true,
        maxWidth: (window.screen.width > 600) ? 500 : undefined,
        width: (window.screen.width < 600) ? '100%' : undefined,
        data: { feature: evt.feature, navigateTo: "map" }
      });

      dialogCreateRef.afterClosed().subscribe(() => {
        this.drawingService.getDraw().source.removeFeature(evt.feature);
        this.data.selectActivation();
      });
    });
  }

  ngOnInit() {}
}

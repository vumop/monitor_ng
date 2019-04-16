import { Component, OnInit, Input, Output } from "@angular/core";
import { Subject } from "rxjs/Subject";

import { MatSnackBar } from "@angular/material";
import { DrawingService } from "./.././/../../services/drawing.service";

@Component({
  selector: "app-tool-panel",
  templateUrl: "./tool-panel.component.html",
  styleUrls: ["./tool-panel.component.css"]
})
export class ToolPanelComponent implements OnInit {
  @Input()
  public drawer: any;

  @Input() public sideType$: Subject<string>;

  private activeSide: string;

  constructor(
    private drawingService: DrawingService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  public activeDrawer = (type): void => {
    if (type === this.activeSide) {
      this.drawer.toggle();
    } else {
      this.activeSide = type;
      this.sideType$.next(this.activeSide);
      if (!this.drawer.opened) {
        this.drawer.toggle();
      }
    }
  };

  public getArea = () => {
    this.drawingService.startDraw("Polygon");
    this.drawingService.getDraw().vectorClear = true;
    this.drawingService.getDraw().draw.on("drawend", evt => {
      const area = Math.round(evt.feature.getGeometry().getArea() / 100) / 100;
      this.snackBar.open("Výměra: ", `${area} ha`, {
        duration: 3500
      });
    });
  };

  public getLength = () => {
    this.drawingService.startDraw("LineString");
    this.drawingService.getDraw().vectorClear = true;
    this.drawingService.getDraw().draw.on("drawend", evt => {
      const length =
        Math.round((evt.feature.getGeometry().getLength() / 1000) * 100) / 100;
      this.snackBar.open("Délka: ", `${length} km`, {
        duration: 3500
      });
    });
  };
}

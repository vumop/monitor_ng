import { Component, OnInit, Input, Output } from "@angular/core";
import { Subject } from "rxjs/Subject";

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

  constructor() {}

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
}

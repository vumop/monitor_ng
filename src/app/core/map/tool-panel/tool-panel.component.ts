import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-tool-panel",
  templateUrl: "./tool-panel.component.html",
  styleUrls: ["./tool-panel.component.css"]
})
export class ToolPanelComponent implements OnInit {
  @Input()
  public drawer: any;

  constructor() {}

  ngOnInit() {}
}

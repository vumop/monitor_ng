import { Component, OnInit, Inject } from "@angular/core";

import {
  MAT_DIALOG_DATA,
  MatTabChangeEvent,
  MatDialogRef
} from "@angular/material";

import { Router } from "@angular/router";

export interface DataModel {
  onActivate: any;
  navigateTo: string;
}

@Component({
  selector: "app-incident-create-info",
  templateUrl: "./incident-create-info.component.html",
  styleUrls: ["./incident-create-info.component.css"]
})
export class IncidentCreateInfoComponent implements OnInit {
  public onActivate: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DataModel,
    public dialogRef: MatDialogRef<IncidentCreateInfoComponent>,
    private router: Router
  ) {
    this.onActivate = this.data.onActivate;
  }

  ngOnInit() {}
}

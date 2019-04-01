import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: "app-incident-detail",
  templateUrl: "./incident-detail.component.html",
  styleUrls: ["./incident-detail.component.css"]
})
export class IncidentDetailComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){

  }

  ngOnInit() {}
}

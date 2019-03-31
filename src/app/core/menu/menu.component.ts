import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  /**
   * aplication title
   */
  public title: string;

  constructor() {
    this.title = "Mapování eroze";
  }

  ngOnInit() {}
}

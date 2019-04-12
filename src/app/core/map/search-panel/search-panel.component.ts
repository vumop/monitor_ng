import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.css']
})
export class SearchPanelComponent implements OnInit {

  @Input()
  public drawer: any;

  constructor() { }

  ngOnInit() {
  }

}

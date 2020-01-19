import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-search-ui',
  templateUrl: './search-ui.component.html',
  styleUrls: ['./search-ui.component.scss']
})
export class SearchUiComponent implements OnInit {
public showResults;
  algolia: {
    appId: '6WC4GMC9WC',
    apiKey: '775349fb740cca36b51b5751db931cc9',
    indexName: 'furniture',
    urlSync: false
  }

  constructor() {

  }
  valuechange(e){
    this.showResults = e ? true : false;
  }

  ngOnInit() {
   
  }
}

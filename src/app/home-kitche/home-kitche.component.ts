import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as algoliasearch from 'algoliasearch';
@Component({
  selector: 'app-home-kitche',
  templateUrl: './home-kitche.component.html',
  styleUrls: ['./home-kitche.component.scss']
})
export class HomeKitcheComponent implements OnInit {
  public result;
  public client;
  public index;
  closeResult: string;
  public imageName;
  constructor(db: AngularFireDatabase,) { 
    this.client = algoliasearch('6WC4GMC9WC', "6WC4GMC9WC", { protocol: "https:" });
    db.object(`HomeKitchen`).valueChanges().subscribe(result =>{
      console.log(result);
    this.result = result
    let temparr = [];
    let keys = Object.keys(this.result)
    for (let i = 0; i < keys.length; i++) {
      let k = keys[i];
      let car = this.result[k];
      temparr.push(car);
    }
    this.imageName = temparr;
    console.log(this.imageName);
    })

    this.index = this.client.initIndex("furniture");
  }

  ngOnInit() {
  }

}

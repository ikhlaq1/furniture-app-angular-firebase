import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'app-interior-decoration',
  templateUrl: './interior-decoration.component.html',
  styleUrls: ['./interior-decoration.component.scss']
})
export class InteriorDecorationComponent implements OnInit {
  public result;
  closeResult: string;
  public imageName;
  constructor(db: AngularFireDatabase,) { 
    db.object(`Interiordecoration`).valueChanges().subscribe(result =>{
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
  }

  ngOnInit() {
  }

}

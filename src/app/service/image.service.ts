import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import 'firebase/storage';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {


  }

  getImage(key: string) {
    let auth ="9JQ7kAoLIkXYvV840DWOKvIES8n1"

      this.db.object(`profile/${auth}/Furniture/${key}`).valueChanges().subscribe(result => {
        console.log(result);
      })
  }
} 

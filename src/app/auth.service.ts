import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp, FirebaseAuth } from 'angularfire2';
import { Router } from '@angular/router';

import 'firebase/storage';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;

  authState=null
  constructor(
    private af: AngularFireAuth,
    private router: Router
  ) {
    
  }
  get authenticated(): boolean {
    return this.authState !== null;
  }


}

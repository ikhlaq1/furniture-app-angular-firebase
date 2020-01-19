import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../app/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'furniture';
  aboutUs;
  address;
  email;
  mobile;
  constructor(
    private auth: AuthService,
    public af: AngularFireAuth,
    public afd: AngularFireDatabase,
    public router: Router

  ) {
    afd.object(`info/address`).valueChanges().subscribe(result => {
      console.log(result);
      this.email= result['email'];
      this.aboutUs= result['aboutUs'];
      this.address= result['adress'];
      this.mobile= result['mobileNumber'];

    },(err)=>{
      console.log(err);
      
    });

  }

  register() {
    this.af.auth
      .createUserWithEmailAndPassword('ikhlaq@gmail.com', 'ikhlaq')
      .then(value => {
        console.log('Success!', value);
        // this.addInfo();
      })
      .catch(err => {
        console.log('Something went wrong:', err);
      });
  }

 
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loginForm: FormGroup;
  public loading;
  quantity;
  hits;
  public user;
  imageUrlArray;
  imageName
  public result
  public filteredResult;
  public buttodisable: boolean;
  closeResult: string;
  public showResults;
  algolia: {
    appId: '6WC4GMC9WC',
    apiKey: '775349fb740cca36b51b5751db931cc9',
    indexName: 'furniture',
    urlSync: true
  }

  valuechange(e){

    if(e){
      this.showResults = true
      console.log(this.showResults);
      
    }
    else{
      this.showResults=false
      console.log(this.showResults);
    }
    console.log(this.showResults);

  }
  onSearchChange(e){
    if(e.results.query !=""){
      this.showResults = true
      console.log("treu");
    this.hits = e.results.hits
      
    }
    if(e.results.query =="") {
      this.showResults=false
      this.hits=null
      console.log("false");
      
    }

    
  }
  constructor(
    private toastr: ToastrManager,
    public af: AngularFireAuth,
    public db: AngularFireDatabase,
    private formBuilder: FormBuilder,
    private spinnerService: Ng4LoadingSpinnerService,
    public router: Router,
    private modalService: NgbModal) {
    af.authState.subscribe(user => {
      this.user = user
      console.log(this.user);
    })
    db.object(`all`).valueChanges().subscribe(result => {
      console.log(result);
      this.result = result
      let temparr = [];
      let imageUrls = [];
      let keys = Object.keys(this.result)
      for (let i = 0; i < keys.length; i++) {
        let k = keys[i];
        let car = this.result[k];
        temparr.push(car);
        imageUrls.push(car.Imageurl);
      }
      this.imageName = temparr;
      this.imageUrlArray = imageUrls
      console.log("imageName",this.imageName);
      console.log(this.imageUrlArray);
    })
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  calculateTotal(event){
    event = event.charAt(0).toUpperCase()+ event.slice(1);
    if(event){
      console.log(event);
      console.log(this.imageName);
      
      this.showResults=true;
      this.filteredResult = this.imageName.filter(function(person){
        return person.imageTitle.indexOf(event)>-1;
      })
      console.log("filtered data",this.filteredResult);
    }
    else if(!event){
      this.showResults=false;
      console.log("no evebdt");
    }
  }
  onSubmit() {
    console.log(this.loginForm.value);
    let credentials = this.loginForm.value
    if (this.loginForm.invalid) {
      console.log("invalid");

      if (this.loginForm.controls.username.invalid) {
        console.log("username inavli");
        this.showError("enter valid email")
        return false;
      }
      if (this.loginForm.controls.password.invalid) {
        this.showError("enter valid password")
        return false;
      }
    }
    if (this.loginForm.valid) {
      console.log("in valod");
      this.login(credentials)
    }
  }
  showSuccess(msg) {
    this.toastr.successToastr(msg);
  }
  showError(msg) {
    this.toastr.errorToastr(msg);
  }
  login(credentials) {
    this.spinnerService.show();
    this.af.auth.signInWithEmailAndPassword(credentials.username, credentials.password).then(value => {
      this.showSuccess("Logged In")
      console.log(value.user["ra"]);
      this.modalService.dismissAll();
      this.spinnerService.hide();
      this.router.navigate(['/admin']);
    })
      .catch((e) => {
        console.log(e);
        if (e['code'] == "auth/user-not-found") {
          this.spinnerService.hide();
          this.showError("No user registered with this email")

        }
        if (e['code'] == "auth/wrong-password") {
          this.spinnerService.hide();
          this.showError("Password is wrong ")
        }
      })
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  logout() {
    this.af.auth.signOut();
    this.router.navigate(['']);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}

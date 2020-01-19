import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../auth.service'
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { map } from 'rxjs/operators';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  registerForm: FormGroup;
  Adress: FormGroup;

  public uploadProgress;
  public authenticated: boolean = false;
  public randomId
  submitted = false;
  task: AngularFireUploadTask;
  bannerTask: AngularFireUploadTask;
  public ref;
  progress: any;  // Observable 0 to 100
  public imagePath;
  public bannerImagePath;
  public categories
  public tags;
  image: string; // base64
  public temparr = [];
  public tagstemparr = [];
  public imageName;
  public bannerImageName;
  public downloadURL;
  constructor(
    private toastr: ToastrManager,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    public router: Router,
    public storage: AngularFireStorage,
    public af: AngularFireAuth,
    private spinnerService: Ng4LoadingSpinnerService,
    public afd: AngularFireDatabase,
  ) {
    this.af.authState.subscribe((auth) => {
      if (!auth) {
        console.log("no auth");
        this.router.navigate([''])
      }
      else if (auth) {
        console.log(" auth");
        this.authenticated = true

      }
    })
  }

  startfunc() {
    this.afd.object(`categories`).valueChanges().subscribe(result => {
      this.imageName = "Choose Image";
      console.log(this.imageName);
      this.categories = result
      console.log(this.categories);
      for (let i = 0; i < this.categories.length; i++) {
        let car = this.categories[i];
        this.temparr.push(car);
      }
    });
    this.afd.object(`tags`).valueChanges().subscribe(result => {
      
      this.tags = result
      console.log(this.tags);
      for (let i = 0; i < this.tags.length; i++) {
        let car = this.tags[i];
        this.tagstemparr.push(car);
      }
    });
    console.log(this.tagstemparr);
  }

  ngOnInit() {
    this.startfunc();
    this.registerForm = this.formBuilder.group({
      imageTitle: ['', Validators.required],
      imageDescription: ['', Validators.required],
      imageCategory: ['', [Validators.required,]],
      imageTags: ['', [Validators.required,]],
      productPrice: ['', [Validators.required,]],
    });

    this.Adress = this.formBuilder.group({
      aboutUs: ['', Validators.required],
      adress: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required,]],

    });
  }


  onSubmit() {
    if (this.registerForm.invalid) {
      console.log("invalid");

      if (this.registerForm.controls.imageTitle.invalid) {
        this.showError("Product Tittle is required")
        return false;
      }
      if (this.registerForm.controls.imageDescription.invalid) {
        this.showError("Product Description is required")
        return false;
      }

      if (this.registerForm.controls.imageCategory.invalid) {
        console.log("username inavli");
        this.showError("Image Category required")
        return false;
      }
      if (this.registerForm.controls.productPrice.invalid) {
        this.showError("Product Price is required")
        return false;
      }

    }
    if (this.registerForm.valid) {
      this.spinnerService.show();
      this.submitted = true;
      console.log(this.registerForm.value);
      let dataToSave = this.registerForm.value;
      console.log("in");
      let category = this.registerForm.controls["imageCategory"].value;
      this.randomId = new Date().valueOf();

      this.af.authState.subscribe(auth => {
        this.afd.object(`profile/${auth.uid}/${category}/${this.randomId}`).set(dataToSave);
        this.afd.object(`${category}/${this.randomId}`).set(dataToSave);
        this.afd.object(`all/${this.randomId}`).set(dataToSave);
        this.afd.object(`profile/${auth.uid}/${category}/${this.randomId}`).update({ id: this.randomId })
        this.afd.object(`${category}/${this.randomId}`).update({ id: this.randomId })
        this.afd.object(`all/${this.randomId}`).update({ id: this.randomId })
        console.log("in fb");
        this.upload()

      }, (err) => {
        console.log(err);
        this.submitted = false;
        this.spinnerService.hide();
      })
    }

  }


  submitAdressData() {
    console.log(this.Adress.value);
    if (this.Adress.invalid) {
      console.log("invalid");

      if (this.Adress.controls.aboutUs.invalid) {
        this.showError("About Us is required")
        return false;
      }
      if (this.Adress.controls.adress.invalid) {
        this.showError("Please Enter Address")
        return false;
      }

      if (this.Adress.controls.email.invalid) {
        this.showError("Enter Valid Email")
        return false;
      }
      if (this.Adress.controls.mobileNumber.invalid) {
        this.showError("Enter mobile Number")
        return false;
      }

    }
    if (this.Adress.valid) {
      console.log("valid");
      this.spinnerService.show();
      let dataToSave = this.Adress.value;
      this.af.authState.subscribe(auth => {
        this.afd.object(`info/address`).set(dataToSave);
        this.spinnerService.hide();
        this.showSuccess("Details Updated")
      }, (err) => {
        console.log(err);
        this.submitted = false;
        this.spinnerService.hide();
      })
    }

  }
  onImageSelected(event) {
    console.log(event);
    this.imagePath = event.target.files[0];
    console.log(this.imagePath);

    console.log(this.imagePath.name);
    this.imageName = this.imagePath.name
  }

  onImageBannerSelected() {
    console.log(event);
    this.bannerImagePath = event.target['files']['0'];
    console.log(this.bannerImagePath);
    console.log(this.bannerImagePath.name);
    this.bannerImageName = this.bannerImagePath.name
  }

  showSuccess(msg) {
    this.toastr.successToastr(msg);
  }
  showError(msg) {
    this.toastr.errorToastr(msg);
  }
  uploadBanner() {
    let randomId = new Date().valueOf();
    this.spinnerService.show();
    this.submitted = true;
    console.log("in banner uplaod");
    console.log(this.bannerImageName);
    this.bannerTask = this.storage.upload(`slideImages/${randomId}`, this.bannerImagePath);
    console.log(this.bannerTask);
    let ref = this.storage.ref(`slideImages/${randomId}`)
    console.log(ref);
    this.bannerTask.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe(url => {
          console.log(url);
          this.afd.object(`slideImages/${randomId}`).set({ imageUrl:url });
          this.afd.object(`slideImages/${randomId}`).update({ id:randomId })

          this.submitted = false;
          this.showSuccess("Item Uploaded")
          this.spinnerService.hide();
        })
      })
    ).subscribe()
    this.uploadProgress = this.bannerTask.snapshotChanges()
      .pipe(map(s =>
        (s.bytesTransferred / s.totalBytes) * 100)
      ), (err) => {
        console.log(err);
        this.submitted = false;
        this.spinnerService.hide();

      };
    console.log("in suces");
  }

  upload() {
    console.log("in uplaod");
    let category = this.registerForm.controls['imageCategory'].value
    console.log(this.imagePath);


    this.task = this.storage.upload(`${category}/${category + this.randomId}`, this.imagePath);
    console.log(this.task);

    let ref = this.storage.ref(`${category}/${category + this.randomId}`)
    console.log(ref);

    this.task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe(url => {
          console.log(url);
          this.af.authState.subscribe(auth => {
            this.afd.object(`all/${this.randomId}`).update({ Imageurl: url })
            this.afd.object(`${category}/${this.randomId}`).update({ Imageurl: url })
            this.afd.object(`profile/${auth.uid}/${category}/${this.randomId}`).update({ Imageurl: url })

            this.submitted = false;
            this.showSuccess("Item Uploaded")
            this.spinnerService.hide();
            this.registerForm.reset();
          });
        })
      })
    ).subscribe()
    this.uploadProgress = this.task.snapshotChanges()
      .pipe(map(s =>
        (s.bytesTransferred / s.totalBytes) * 100)
      ), (err) => {
        console.log(err);
        this.submitted = false;
        this.spinnerService.hide();
      };
    console.log("in suces");

  }
}

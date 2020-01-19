import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class HomepageComponent implements OnInit {
  public result;
  closeResult: string;
  public imageName;
  public imageUrlArray;
  public slideImageName;
  public sliderImageUrlArray;
  constructor(
    public db: AngularFireDatabase,
    public af: AngularFireAuth,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
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
    this.getSliderImages();
  }

getSliderImages(){
  this.db.object(`slideImages`).valueChanges().subscribe(result => {
    console.log(result);
    this.result = result
    let temparr = [];
    let imageUrls = [];
    let keys = Object.keys(this.result)
    for (let i = 0; i < keys.length; i++) {
      let k = keys[i];
      let car = this.result[k].imageUrl;
      temparr.push(car);
      imageUrls.push(car);
    }
    this.slideImageName = temparr;
    this.sliderImageUrlArray = imageUrls.slice(Math.max(imageUrls.length - 5))
    console.log(this.slideImageName);
    console.log(this.sliderImageUrlArray);

  })
}

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

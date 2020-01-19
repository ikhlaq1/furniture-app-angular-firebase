import { Component, OnInit } from '@angular/core';
import { ImageService } from '../service/image.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss']
})
export class ImageDetailComponent implements OnInit {

  public imageUrl = '';

  constructor(private imageService: ImageService,
    private route: ActivatedRoute,
    public db: AngularFireDatabase,
    public af: AngularFireAuth,) { }

  getImageUrl(key: string) {
        let auth ="9JQ7kAoLIkXYvV840DWOKvIES8n1"

        this.db.object(`all/${key}`).valueChanges().subscribe(result => {
          console.log(result);
          this.imageUrl = result['Imageurl']
        })
  }

  ngOnInit() {
    this.getImageUrl(this.route.snapshot.params['id']);
  }
}

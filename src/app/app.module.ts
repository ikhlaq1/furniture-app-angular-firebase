import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomepageComponent } from './homepage/homepage.component';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ng6-toastr-notifications';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { HomeKitcheComponent } from './home-kitche/home-kitche.component';
import { OfficeFurnitureComponent } from './office-furniture/office-furniture.component';
import { FurnitureComponent } from './furniture/furniture.component';
import { InteriorDecorationComponent } from './interior-decoration/interior-decoration.component';
import {SlideshowModule} from 'ng-simple-slideshow';
import { NgAisModule } from 'angular-instantsearch';
import { SearchUiComponent } from './search-ui/search-ui.component';
const appRoutes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'furniture', component: FurnitureComponent },
  { path: 'home-kitchen', component: HomeKitcheComponent },
  { path: 'office-furniture', component: OfficeFurnitureComponent },
  { path: 'interior-decoration', component: InteriorDecorationComponent },
  { path: '', component: HomepageComponent },
  { path: 'image/:id', component: ImageDetailComponent },


];

var config = {
  apiKey: "AIzaSyCVb7hgUCQ9Vo8Ll2n5LG6J6FtOZxP-16U",
  authDomain: "furniture-ed912.firebaseapp.com",
  databaseURL: "https://furniture-ed912.firebaseio.com",
  projectId: "furniture-ed912",
  storageBucket: "furniture-ed912.appspot.com",
  messagingSenderId: "1025465356837"
};

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomepageComponent,
    ImageDetailComponent,
    LoginComponent,
    NavbarComponent,
    HomeKitcheComponent,
    OfficeFurnitureComponent,
    FurnitureComponent,
    InteriorDecorationComponent,
    SearchUiComponent,
  ],
  imports: [
    NgbModule,
    SlideshowModule,
    BrowserAnimationsModule, 
    NgAisModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    ToastrModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
    ),
    BrowserModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule, // for database
    AppRoutingModule,
  ],

  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }

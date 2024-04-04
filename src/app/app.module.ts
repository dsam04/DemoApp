import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';
import { HomePageComponent } from '../components/home-page/home-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatChipsModule} from '@angular/material/chips'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatIconModule} from '@angular/material/icon'
import { MatChipGrid } from '@angular/material/chips';
@NgModule({
  declarations: [
  AppComponent,
  UserProfileComponent,
  HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

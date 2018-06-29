import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FormsModule } from '@angular/forms';

export const firebaseConfig = {
  apiKey: 'AIzaSyBqQakatOld_Mz-EJPlwo4RVLwLVPmemDc',
  authDomain: 'smart-house-iot.firebaseapp.com',
  databaseURL: 'https://smart-house-iot.firebaseio.com',
  projectId: 'smart-house-iot',
  storageBucket: 'smart-house-iot.appspot.com',
  messagingSenderId: '37772893683'
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

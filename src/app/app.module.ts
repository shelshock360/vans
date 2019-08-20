import { NgModule, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,AngularFireDatabaseModule, AngularFirestoreModule,
    FormsModule, AngularFireAuthModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAxrBqIzMMnypU_5ceDuXVP6kymwGA-2vY",
      authDomain: "vans-dd8a5.firebaseapp.com",
      databaseURL: "https://vans-dd8a5.firebaseio.com",
      projectId: "vans-dd8a5",
      storageBucket: "",
      messagingSenderId: "556294629822",
      appId: "1:556294629822:web:98d003ac256436a7"

    }),

  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

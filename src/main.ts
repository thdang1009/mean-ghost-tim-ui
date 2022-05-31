/*!

=========================================================
* Material Dashboard Angular - v2.6.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-angular2
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-angular2/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'hammerjs';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjhqvvT-9WECtltXGcLAq6L8m4LzCD6QU",
  authDomain: "ghost-site-fe-ae2f4.firebaseapp.com",
  projectId: "ghost-site-fe-ae2f4",
  storageBucket: "ghost-site-fe-ae2f4.appspot.com",
  messagingSenderId: "67382640406",
  appId: "1:67382640406:web:b1adb5ef254542060b1a37",
  measurementId: "G-FWH80SC06E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

if (environment.production) {
  enableProdMode();
  // console.log = () => {};
}



platformBrowserDynamic().bootstrapModule(AppModule);

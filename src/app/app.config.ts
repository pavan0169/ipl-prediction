import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBrn86efw6nGhWP6vTYgwxOJNahAxEk_W0",
  authDomain: "iplprediction-fa126.firebaseapp.com",
  projectId: "iplprediction-fa126",
  storageBucket: "iplprediction-fa126.appspot.com",
  messagingSenderId: "587701065696",
  appId: "1:587701065696:web:2c028aa8c46cd835f87d85",
  measurementId: "G-LH4V6RQQ91"
};

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => getAuth()),
      provideAnalytics(() => getAnalytics())
    ]),
    ScreenTrackingService, UserTrackingService, importProvidersFrom(provideFirestore(() => getFirestore()))]
};

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import {HttpClientModule} from '@angular/common/http';



import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { RouterModule, Routes } from '@angular/router';
import { LogComponent } from './components/log/log.component';



const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'log',      component: LogComponent },
  { path: '**', component: DashboardComponent }
];



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LogComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
       HttpClientModule,
       FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

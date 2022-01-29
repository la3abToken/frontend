import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ToornamentListComponent } from './toornament-list/toornament-list.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';
import detectEthereumProvider from '@metamask/detect-provider';
import { LoadingScreenInterceptor } from './loading.interceptors';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ModalModule,
    ReactiveFormsModule,
    RouterModule.forRoot([{ path: '', component: ToornamentListComponent }]),
  ],
  declarations: [AppComponent,  ToornamentListComponent,LoadingScreenComponent],
 /* providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingScreenInterceptor,
      multi: true
    }
  ],*/
  bootstrap: [AppComponent],
})
export class AppModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/

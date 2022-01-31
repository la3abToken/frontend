import { Component, OnInit, OnDestroy,ViewChild,ElementRef  } from '@angular/core';
import { ToornamentService } from '../toornaments.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Tournament } from '../toornaments';
import { User } from '../user';

import { HttpResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { LoadingScreenService } from "../services/loading-screen/loading-screen.service";
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-toornament-list',
  templateUrl: './toornament-list.component.html',
  styleUrls: ['./toornament-list.component.css'],
})
export class ToornamentListComponent implements OnInit {

  @ViewChild('closeModal') closeModal: ElementRef | null = null;
  @ViewChild('errorModal') public errorModal:ModalDirective | null = null;

  tournaments: Tournament[] | null = [];
  user: User | null = null;
  isError: boolean = false;
  session = localStorage.getItem("access_token");
  destroy$: Subject<boolean> = new Subject<boolean>();
  public isAuthenticating = false;
  constructor(private authService: AuthService, private dataService: ToornamentService,private loadingScreenService: LoadingScreenService) {}

  ngOnInit() {
    this.user  = new User(localStorage.getItem("access_token"),localStorage.getItem("address"),localStorage.getItem("playerName"))

    this.dataService
      .sendGetRequest()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<Tournament[]>) => {
        console.log(res);
        this.tournaments = res.body;
      });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  disableError(){
    this.isError = true;
  }

  login() {
    this.isAuthenticating = true;
    console.log(this.closeModal);

    this.closeModal?.nativeElement.click() 
    this.loadingScreenService.startLoading();
    this.authService.signInWithMetaMask().subscribe(
      () => {


        this.loadingScreenService.stopLoading();
        this.isAuthenticating = false;
        this.user  = new User(localStorage.getItem("access_token"),localStorage.getItem("address"),localStorage.getItem("playerName"))
      },
      (err) => {
        console.log("ERROR : " + this.errorModal)
        this.errorModal?.show()
        this.loadingScreenService.stopLoading();
        console.log(err);
        this.isError = true;
        this.isAuthenticating = false;
      }
    );
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserData } from './shared/interfaces';
import { StateService } from './shared/services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'Rock Paper Scissors';

  public user$: Observable<IUserData>;

  constructor(
    private stateService: StateService
  ) {
    this.user$ = this.stateService.user$;
  }

  ngOnInit() {

  }
}

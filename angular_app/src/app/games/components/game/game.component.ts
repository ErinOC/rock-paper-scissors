import { Component, OnInit } from '@angular/core';
import { map, switchMap, take, tap } from 'rxjs';
// services
import { ApiService } from 'src/app/shared/api.service';
import { StateService } from 'src/app/shared/services/state.service';

const choices = [
  {name: 'rock', icon: '✊', beats: 'scissors', action: 'crushes'},
  {name: 'paper', icon: '✋', beats: 'rock', action: 'covers'},
  {name: 'scissors', icon: '✌', beats: 'paper', action: 'cut'},
]

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less']
})
export class GameComponent implements OnInit {
  public choices = choices;
  public selection: string;
  public outcome: string;
  public outcomeDetails: string;
  public userScore: number;
  public computerScore: number;

  constructor(
    private apiService: ApiService,
    private stateService: StateService,
  ) {}

  ngOnInit(): void {
    this.setInitialScore();
  }

  private setInitialScore(): void {
    this.stateService.user$
      .pipe(
        take(1),
      )
      .subscribe(res => {
        this.userScore = res.user_score;
        this.computerScore = res.opponent_score;
      })
  }

  public submit(): void {
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    const userChoice = choices.find(choice => choice.name === this.selection);
    let winner;

    if (userChoice && userChoice.beats === computerChoice.name) {
      winner = userChoice;
      this.outcome = 'You win!';
      this.userScore += 1;
    } 
    else if (userChoice && computerChoice.beats === userChoice.name) {
      winner = computerChoice;
      this.outcome = 'The computer wins!';
      this.computerScore += 1;
    };

    if (winner) {
      const loser = winner === computerChoice ? userChoice : computerChoice;
      this.outcomeDetails = `${winner.icon} ${winner.action} ${loser.icon}`;
    } else {
      this.outcome = "It's a tie!";
    }
  }

  public reset(): void {
    this.selection = '';
    this.outcome = '';
    this.outcomeDetails = '';
  }

  // Make API call to update the score.
  public save(): void {
    this.stateService.user$
      .pipe(
        tap(res => console.log("???", res)),
        map(user => user.email),
        switchMap(email => {
          return this.apiService.updateUser({
            email: email,
            user_score: this.userScore, 
            opponent_score: this.computerScore
          })
        })
      )
    .subscribe(res => {
      // TODO_IMPROVE: Add success/error notification
    })
  }
}

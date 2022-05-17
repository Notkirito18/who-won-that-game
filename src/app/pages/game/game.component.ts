import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  getRandomFixture,
  leaguesIds,
  nextRandomFixture,
} from '../../helpers/helper';
import { Fixture } from '../../helpers/models';
import { FixturesService } from '../../services/fixtures.service';
import { MatDialog } from '@angular/material/dialog';
import { GameOverComponent } from 'src/app/componants/game-over/game-over.component';
import { ModeComponent } from 'src/app/componants/mode/mode.component';
import { ProvideScoreComponent } from 'src/app/componants/provide-score/provide-score.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  constructor(
    private fixtureService: FixturesService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private mediaObserver: MediaObserver
  ) {}
  //* variables
  fixtures!: Fixture[];
  oldFixtures: string[] = [];
  currentFixture!: Fixture;
  currentMode!: string;
  answered = false;
  gameMode = '';
  score = 0;
  strikes = 0;
  mediaSubscription!: Subscription;
  screenSize = 'lg';
  showLButtons = false;
  showRButtons = false;
  loadingError = false;

  ngOnInit(): void {
    //*screen size
    this.mediaSubscription = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        this.screenSize = result.mqAlias;
        console.log(this.screenSize);
      }
    );

    //* Game mode
    this.route.params.subscribe((params) => {
      this.currentMode = params.mode;
      this.gameMode = params.mode.split('-').join(' ');
    });

    //*Getting fixtures
    const leagueId = leaguesIds.find((elem) => {
      return elem.league == this.currentMode;
    })?.id;

    this.fixtureService.getAllFixtures(leagueId).subscribe(
      (res: { fixtures: Fixture[] }) => {
        this.fixtures = res.fixtures;
        this.currentFixture = getRandomFixture(this.fixtures);
        console.log(this.currentFixture);
      },
      (error) => {
        this.loadingError = true;
        console.log('get error', error);
      }
    );
  }

  nextFixture(answerId: string, nextHomeId: string) {
    this.answered = true;
    const homeWon =
      this.currentFixture.score.home > this.currentFixture.score.away;
    const draw =
      this.currentFixture.score.home == this.currentFixture.score.away;
    let rightAnwser = false;

    if (homeWon) {
      rightAnwser = answerId == this.currentFixture.teams.home._id;
    } else if (draw) {
      rightAnwser = answerId == 'draw';
    } else {
      rightAnwser = answerId == this.currentFixture.teams.away._id;
    }

    setTimeout(() => {
      if (rightAnwser) {
        //* When answered right
        //* making sure you don't get the same fixture
        this.oldFixtures.push(this.currentFixture._id);
        while (this.oldFixtures.includes(this.currentFixture._id)) {
          this.currentFixture = getRandomFixture(this.fixtures);
        }
        if (this.fixtures.length == this.oldFixtures.length) {
          this.oldFixtures = [];
        }
        this.answered = false;
        this.score++;
      } else {
        //* When answered wrong
        this.strikes++;
        this.snackBar.open('You got a strike !', '', {
          duration: 3000,
          panelClass: 'strike-snackbar',
        });
        if (this.strikes > 2) {
          const dialogRef = this.dialog.open(GameOverComponent, {
            width: '600px',
            maxHeight: '800px',
            data: { score: this.score },
          });
          dialogRef.afterClosed().subscribe((data) => {
            if (data) {
              if (data.mode == 'mode') {
                //*open modes to start a new game
                const modesDialogRef = this.dialog.open(ModeComponent, {
                  width: '719px',
                  maxHeight: '800px',
                });
                modesDialogRef.afterClosed().subscribe((data: string) => {
                  if (data) {
                    if (data == this.currentMode) {
                      location.reload();
                    } else {
                      this.router.navigate(['game', data]).then(() => {
                        location.reload();
                      });
                    }
                  }
                });
              } else if (data.mode == 'home') {
                //* redirect to home
                this.router.navigate(['home']);
              } else {
                //* restart the game (refresh the page)
                location.reload();
              }
            } else {
              //* restart the game (refresh the page)
              location.reload();
            }
          });
        } else {
          this.oldFixtures.push(this.currentFixture._id);
          while (this.oldFixtures.includes(this.currentFixture._id)) {
            this.currentFixture = getRandomFixture(this.fixtures);
          }
          if (this.fixtures.length == this.oldFixtures.length) {
            this.oldFixtures = [];
          }
          this.answered = false;
        }
      }
    }, 1500);
  }

  onProvideScore() {
    const scoreDialog = this.dialog.open(ProvideScoreComponent, {
      width: '600px',
      maxHeight: '800px',
      data: { fixture: this.currentFixture },
    });
    scoreDialog.afterClosed().subscribe((data) => {
      if (data) {
        if (data.winner == 'draw') {
          this.nextFixture(data.winner, this.currentFixture.teams.away._id);
          if (
            data.homeGoals == this.currentFixture.score.home &&
            data.awayGoals == this.currentFixture.score.away
          ) {
            this.score = this.score + 2;
            this.snackBar.open('You got 2 extra points, keep it going ', '', {
              duration: 3000,
              panelClass: 'extra-points-snackbar',
            });
          } else {
            this.strikes++;
            this.snackBar.open('You got a strike !', '', {
              duration: 3000,
              panelClass: 'strike-snackbar',
            });
          }
        } else if (data.winner == 'home') {
          if (
            data.homeGoals == this.currentFixture.score.home &&
            data.awayGoals == this.currentFixture.score.away
          ) {
            this.score = this.score + 2;
            this.snackBar.open('You got 2 extra points, keep it going ', '', {
              duration: 3000,
              panelClass: 'extra-points-snackbar',
            });
          } else {
            this.strikes++;
            this.snackBar.open('You got a strike !', '', {
              duration: 3000,
              panelClass: 'strike-snackbar',
            });
          }
          this.nextFixture(
            this.currentFixture.teams.home._id,
            this.currentFixture.teams.away._id
          );
        } else {
          this.nextFixture(
            this.currentFixture.teams.away._id,
            this.currentFixture.teams.away._id
          );
          if (
            data.homeGoals == this.currentFixture.score.home &&
            data.awayGoals == this.currentFixture.score.away
          ) {
            this.score = this.score + 2;
            this.snackBar.open('You got 2 extra points, keep it going ', '', {
              duration: 3000,
              panelClass: 'extra-points-snackbar',
            });
          } else {
            this.strikes++;
            this.snackBar.open('You got a strike !', '', {
              duration: 3000,
              panelClass: 'strike-snackbar',
            });
          }
        }
      }
    });
  }
  tryAgain() {
    location.reload();
  }

  getRandomFixture = getRandomFixture;
  nextRandomFixture = nextRandomFixture;
}

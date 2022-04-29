import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import FastAverageColor from 'fast-average-color';
import {
  getRandomFixture,
  getRandomNum,
  nextRandomFixture,
} from '../../helpers/helper';
import { Fixture } from '../../helpers/models';
import { FixturesService } from '../../services/fixtures.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  constructor(
    private fixtureService: FixturesService,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private _document: Document
  ) {}
  fixtures!: Fixture[];
  currentFixture!: Fixture;
  answered = false;
  gameMode = '';
  score = 0;
  // @ViewChild('homeImage') homeImage: any;
  // @ViewChild('homeImageContainer') homeImageContainer: any;

  ngOnInit(): void {
    //* Gmae mode
    this.route.params.subscribe((params) => {
      console.log(params.mode);
      this.gameMode = params.mode.split('-').join(' ');
    });

    //*Getting fixtures
    this.fixtureService.getAllFixtures().subscribe(
      (res: { fixtures: Fixture[] }) => {
        this.fixtures = res.fixtures;
        this.currentFixture = getRandomFixture(this.fixtures);
        console.log(this.currentFixture);
      },
      (error) => {
        console.log('get error', error);
      }
    );
  }

  nextFixture(answerId: string, nextHomeId: string) {
    console.log(this.currentFixture);
    this.answered = true;
    const homeWon =
      this.currentFixture.score.home > this.currentFixture.score.away;
    const draw =
      this.currentFixture.score.home == this.currentFixture.score.away;
    let rightAnwser = false;

    if (homeWon) {
      if (answerId == this.currentFixture.teams.home._id) {
        console.log('right answer');
        rightAnwser = true;
      } else {
        console.log('wrong answer');
      }
    } else if (draw) {
      if (answerId == 'draw') {
        console.log('right answer');
        rightAnwser = true;
      } else {
        console.log('wrong answer');
      }
    } else {
      if (answerId == this.currentFixture.teams.away._id) {
        console.log('right answer');
        rightAnwser = true;
      } else {
        console.log('wrong answer');
      }
    }

    setTimeout(() => {
      if (rightAnwser) {
        this.currentFixture = nextRandomFixture(this.fixtures, nextHomeId);
        alert('you passed');
        this.answered = false;
      } else {
        alert('you fucking lost !!');
      }
    }, 1000);
  }

  getRandomFixture = getRandomFixture;
  nextRandomFixture = nextRandomFixture;
}
